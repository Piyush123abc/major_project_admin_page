"use client";

import { useEffect, useRef, useState, use, useCallback } from "react";
import api from "@/lib/api";
import { Network, Node as VisNode, Edge as VisEdge, Options } from "vis-network";
import { DataSet } from "vis-data";
import { Activity, Users, Zap, RefreshCw, Play, Square, ChevronRight, AlertCircle, WifiOff } from "lucide-react";

// --- TYPES ---
interface RawNode {
    id: string | number;
    label: string;
    type?: string;
}

interface RawEdge {
    from: string | number;
    to: string | number;
}

interface ClusterNode extends VisNode {
    rawMembers: RawNode[];
    isMainNetwork: boolean;
    size: number;
}

export default function LiveMonitor({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const classroomId = resolvedParams.id;

    const containerRef = useRef<HTMLDivElement>(null);
    const networkRef = useRef<Network | null>(null);

    const nodesRef = useRef(new DataSet<ClusterNode>());
    const edgesRef = useRef(new DataSet<VisEdge>());

    // --- State & Memory ---
    const simNodesRef = useRef<RawNode[]>([]);
    const simEdgesRef = useRef<RawEdge[]>([]);

    // Memory for the transition animation engine
    const prevDataRef = useRef({ nodes: [] as RawNode[], edges: [] as RawEdge[] });
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [telemetry, setTelemetry] = useState<any>(null);
    const [isActive, setIsActive] = useState(true);
    const [isSimulating, setIsSimulating] = useState(false);
    const [selectedCluster, setSelectedCluster] = useState<ClusterNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ==========================================
    // CLUSTERING & VIRTUAL MERGING (DETERMINISTIC IDs)
    // ==========================================
    const calculateClusters = useCallback((nodes: RawNode[], edges: RawEdge[]): ClusterNode[] => {
        const adjList: Record<string, string[]> = {};
        nodes.forEach(n => adjList[n.id.toString()] = []);

        edges.forEach(e => {
            const from = e.from.toString();
            const to = e.to.toString();
            if (adjList[from] && adjList[to]) {
                adjList[from].push(to);
                adjList[to].push(from);
            }
        });

        const visited = new Set<string>();
        const components: RawNode[][] = [];

        // 1. Find all physically connected components
        nodes.forEach(node => {
            const id = node.id.toString();
            if (!visited.has(id)) {
                const queue = [id];
                visited.add(id);
                const members: RawNode[] = [];

                while (queue.length) {
                    const cur = queue.shift()!;
                    const curNode = nodes.find(n => n.id.toString() === cur);
                    if (curNode) members.push(curNode);

                    adjList[cur].forEach(nei => {
                        if (!visited.has(nei)) {
                            visited.add(nei);
                            queue.push(nei);
                        }
                    });
                }

                // Sort members by ID so the "root" ID is always identical between ticks (Stops the bounce)
                members.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
                components.push(members);
            }
        });

        const clusters: ClusterNode[] = [];
        const mainNetworkMembers: RawNode[] = [];

        // 2. Virtual Merging: Merge ALL Master/Teacher components into a single Main Network
        components.forEach(comp => {
            const isConnectedToGateway = comp.some(n =>
                n.type === "teacher" || n.id === "teacher" ||
                n.type === "master" || n.label.toLowerCase().includes("master")
            );

            if (isConnectedToGateway) {
                mainNetworkMembers.push(...comp);
            } else {
                const size = comp.length;
                const rootId = comp[0].id.toString(); // Stable ID anchor

                if (size > 1) {
                    clusters.push({
                        id: `cluster_iso_${rootId}`, // Deterministic ID
                        label: `ISOLATED GRAPH\n(${size} Nodes)`,
                        value: size * 6,
                        color: { background: "#f59e0b", border: "#b45309" }, // Bold Orange
                        font: { color: "#ffffff", size: 16 },
                        shape: "box",
                        borderWidth: 3,
                        margin: { top: 12, bottom: 12, left: 12, right: 12 },
                        rawMembers: comp,
                        isMainNetwork: false,
                        size
                    });
                } else {
                    clusters.push({
                        id: `cluster_orph_${rootId}`, // Deterministic ID
                        label: `Orphan\n(${comp[0].label})`,
                        value: 5,
                        color: { background: "#8b5cf6", border: "#5b21b6" }, // Bold Purple
                        font: { color: "#ffffff", size: 12 },
                        shape: "box",
                        borderWidth: 2,
                        margin: { top: 10, bottom: 10, left: 10, right: 10 },
                        rawMembers: comp,
                        isMainNetwork: false,
                        size: 1
                    });
                }
            }
        });

        // 3. Create the massive combined Main Network node (Stable ID)
        if (mainNetworkMembers.length > 0) {
            clusters.push({
                id: "cluster_main_network",
                label: `MAIN NETWORK\n(${mainNetworkMembers.length} Nodes)`,
                value: mainNetworkMembers.length * 5,
                color: { background: "#10b981", border: "#047857" }, // Bold Green
                font: { color: "#ffffff", size: 18 },
                shape: "box",
                borderWidth: 4,
                margin: { top: 15, bottom: 15, left: 15, right: 15 },
                rawMembers: mainNetworkMembers,
                isMainNetwork: true,
                size: mainNetworkMembers.length
            });
        }

        return clusters;
    }, []);

    // ==========================================
    // 2-STEP ANIMATION ENGINE (WITH SMART SYNC)
    // ==========================================
    const applyGraphUpdate = useCallback((newNodes: RawNode[], newEdges: RawEdge[]) => {
        const oldNodes = prevDataRef.current.nodes;
        const oldEdges = prevDataRef.current.edges;

        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
        }

        const isNewEdge = (e1: RawEdge) => !oldEdges.some(e2 =>
            (e1.from === e2.from && e1.to === e2.to) || (e1.from === e2.to && e1.to === e2.from)
        );
        const addedEdges = newEdges.filter(isNewEdge);

        const applyFinalState = () => {
            const newClusters = calculateClusters(newNodes, newEdges);

            // SMART SYNC: Update existing, remove missing (Stops the explosive bounce)
            const currentIds = nodesRef.current.getIds();
            const newIds = newClusters.map(c => c.id);
            const idsToRemove = currentIds.filter(id => !newIds.includes(id));

            nodesRef.current.update(newClusters);
            nodesRef.current.remove(idsToRemove);
            edgesRef.current.clear(); // Clear glowing transition edges

            const connectedCount = newClusters.find(c => c.isMainNetwork)?.size || 0;
            setTelemetry({
                total_enrolled: newNodes.length,
                total_connected: connectedCount,
                disconnected: newNodes.length - connectedCount
            });
        };

        if (addedEdges.length > 0 && oldNodes.length > 0) {
            const oldClusters = calculateClusters(oldNodes, oldEdges);
            const nodeToCluster: Record<string, string> = {};
            oldClusters.forEach(c => {
                c.rawMembers.forEach(m => { nodeToCluster[m.id.toString()] = c.id as string; });
            });

            const tempVisEdges: VisEdge[] = [];
            addedEdges.forEach((e, idx) => {
                const fromCluster = nodeToCluster[e.from.toString()];
                const toCluster = nodeToCluster[e.to.toString()];

                if (fromCluster && toCluster && fromCluster !== toCluster) {
                    tempVisEdges.push({
                        id: `temp_edge_${Date.now()}_${idx}`,
                        from: fromCluster,
                        to: toCluster,
                        color: { color: "#06b6d4", highlight: "#22d3ee" }, // Bright Glowing Cyan
                        width: 6, // Thick and highly visible
                        dashes: [15, 10],
                        smooth: {
                            enabled: true,
                            type: "continuous",
                            roundness: 0.5
                        } // Fixed TypeScript strictness
                    });
                }
            });

            if (tempVisEdges.length > 0) {
                // Phase 1: Draw the highly visible temporary connecting edges
                edgesRef.current.add(tempVisEdges);

                // Phase 2: Wait 1 second, then snap clusters together smoothly
                animationTimeoutRef.current = setTimeout(() => {
                    applyFinalState();
                }, 1000);

                prevDataRef.current = { nodes: newNodes, edges: newEdges };
                return;
            }
        }

        applyFinalState();
        prevDataRef.current = { nodes: newNodes, edges: newEdges };

    }, [calculateClusters]);

    // ==========================================
    // GRAPH INIT (WITH HIGH DAMPING)
    // ==========================================
    useEffect(() => {
        if (!containerRef.current) return;

        const options: Options = {
            nodes: { shadow: { enabled: true, color: 'rgba(0,0,0,0.4)', size: 10 } },
            edges: { width: 3, color: { color: "#94a3b8", opacity: 0.8 } },
            physics: {
                enabled: true,
                solver: "repulsion",
                repulsion: {
                    nodeDistance: 250,
                    springConstant: 0.04, // Lower = gentler snap
                    damping: 0.9 // VERY HIGH: Stops nodes from bouncing back and forth
                },
                stabilization: { enabled: true, iterations: 100 }
            },
            interaction: { hover: true, tooltipDelay: 200 }
        };

        networkRef.current = new Network(containerRef.current, { nodes: nodesRef.current, edges: edgesRef.current }, options);

        networkRef.current.on("click", (params) => {
            if (params.nodes.length) {
                const data = nodesRef.current.get(params.nodes[0]) as unknown as ClusterNode;
                setSelectedCluster(data || null);
            } else {
                setSelectedCluster(null);
            }
        });

        return () => {
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            networkRef.current?.destroy();
        };
    }, []);

    // ==========================================
    // SIMULATION LOOP
    // ==========================================
    const runSimulationStep = useCallback(() => {
        if (simNodesRef.current.length === 0) {
            const nodes: RawNode[] = [
                { id: "teacher", label: "Teacher", type: "teacher" },
                { id: "master_1", label: "Master Node A", type: "master" },
                { id: "master_2", label: "Master Node B", type: "master" }
            ];
            for (let i = 1; i <= 150; i++) {
                nodes.push({ id: `stu_${i}`, label: `Student ${i}`, type: "student" });
            }
            simNodesRef.current = nodes;
        }

        const ids = simNodesRef.current.map(n => n.id);
        const currentEdges = [...simEdgesRef.current];

        // INCREASED EDGE CREATION: Simulating multiple students pairing up simultaneously across the classroom
        for (let i = 0; i < 25; i++) {
            const from = ids[Math.random() * ids.length | 0];
            const to = ids[Math.random() * ids.length | 0];
            if (from !== to && !currentEdges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))) {
                currentEdges.push({ from, to });
            }
        }
        simEdgesRef.current = currentEdges;

        applyGraphUpdate(simNodesRef.current, simEdgesRef.current);
    }, [applyGraphUpdate]);

    // ==========================================
    // REAL DATA POLLING
    // ==========================================
    const fetchRealData = useCallback(async () => {
        if (isSimulating) return;

        setIsLoading(true);
        try {
            const res = await api.get(`/session/admin/session/${classroomId}/state/`);
            if (!res.data.active) {
                setIsActive(false);
                setIsLoading(false);
                return;
            }

            const nodes = res.data.graph.nodes;
            const edges = res.data.graph.edges.map((e: any) => ({ from: e.source, to: e.target }));

            applyGraphUpdate(nodes, edges);
        } catch {
            console.error("Backend error");
        } finally {
            setIsLoading(false);
        }
    }, [classroomId, applyGraphUpdate, isSimulating]);

    useEffect(() => {
        if (isSimulating) return;
        fetchRealData();
        const interval = setInterval(fetchRealData, 3000); // 3 SECONDS
        return () => clearInterval(interval);
    }, [fetchRealData, isSimulating]);

    useEffect(() => {
        if (!isSimulating) return;
        runSimulationStep();
        const interval = setInterval(runSimulationStep, 3000); // 3 SECONDS
        return () => clearInterval(interval);
    }, [isSimulating, runSimulationStep]);

    const toggleSimulation = () => {
        if (!isSimulating) {
            simNodesRef.current = [];
            simEdgesRef.current = [];
            prevDataRef.current = { nodes: [], edges: [] };
        } else {
            nodesRef.current.clear();
            edgesRef.current.clear();
            setSelectedCluster(null);
            prevDataRef.current = { nodes: [], edges: [] };
        }
        setIsSimulating(prev => !prev);
    };

    if (!isActive) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <h2 className="text-3xl font-bold text-foreground">Session Closed</h2>
                    <p className="text-muted-foreground">This classroom session is no longer active.</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI RENDER
    // ==========================================
    return (
        <div className="flex h-screen bg-background">
            <div className="flex-1 flex flex-col">
                <header className="border-b border-border bg-card">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-500" />
                                <h1 className="text-2xl font-bold text-foreground">
                                    {isSimulating ? "Simulation Mode" : `Classroom ${classroomId}`}
                                </h1>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {isSimulating ? "Demo mode" : "Live network monitoring"}
                            </p>
                        </div>

                        <button
                            onClick={toggleSimulation}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${isSimulating
                                ? "bg-red-500/10 text-red-600 hover:bg-red-500/20"
                                : "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                                }`}
                        >
                            {isSimulating ? (
                                <><Square className="w-4 h-4" /> Stop Simulation</>
                            ) : (
                                <><Play className="w-4 h-4" /> Start Simulation</>
                            )}
                        </button>
                    </div>

                    <div className="px-6 pb-4 grid grid-cols-3 gap-3">
                        <div className="bg-background rounded-lg p-3 border border-border">
                            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                                <Users className="w-4 h-4" /> Total Enrolled
                            </p>
                            <p className="text-2xl font-bold text-foreground mt-1">
                                {telemetry?.total_enrolled || 0}
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-3 border border-border">
                            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                                <Zap className="w-4 h-4 text-green-500" /> Connected
                            </p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {telemetry?.total_connected || 0}
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-3 border border-border">
                            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                                <WifiOff className="w-4 h-4 text-amber-500" /> Disconnected
                            </p>
                            <p className="text-2xl font-bold text-amber-600 mt-1">
                                {telemetry?.disconnected || 0}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative bg-card">
                    <div ref={containerRef} className="w-full h-full" />
                    {isLoading && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
                            <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                            <span className="text-sm text-muted-foreground">Updating...</span>
                        </div>
                    )}
                </div>
            </div>

            {selectedCluster && (
                <div className="w-96 border-l border-border bg-card flex flex-col">
                    <div className="px-5 py-4 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold text-foreground">Cluster Details</h2>
                            <button onClick={() => setSelectedCluster(null)} className="text-muted-foreground hover:text-foreground transition">✕</button>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedCluster.rawMembers.length} participants</p>
                    </div>

                    <div className="px-5 py-3 space-y-2 border-b border-border bg-background/50">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (selectedCluster.color as any)?.background }} />
                            <span className="text-sm font-semibold text-foreground">
                                {selectedCluster.isMainNetwork ? "Primary Network" : selectedCluster.size > 1 ? "Isolated Group" : "Orphan Node"}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {selectedCluster.isMainNetwork
                                ? "Connected via Teacher or Master Node"
                                : selectedCluster.size > 1
                                    ? "Disconnected from main network"
                                    : "Single unconnected participant"}
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-3">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Members</h3>
                        <div className="space-y-2">
                            {selectedCluster.rawMembers.map((member, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-background hover:bg-background/80 transition cursor-pointer group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition
                                        ${member.type === "teacher" || member.type === "master" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}
                                    `}>
                                        {member.type === "teacher" ? "👨‍🏫" : member.type === "master" ? "🟢" : "👤"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{member.label}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{member.type || "student"}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition opacity-0 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-5 py-3 border-t border-border bg-background/50 text-xs text-muted-foreground">
                        Updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            )}
        </div>
    );
}