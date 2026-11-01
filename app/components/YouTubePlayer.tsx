"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YouTubePlayerProps {
    videoId: string;
}

export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        // 1. Load YouTube IFrame API script if not present
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            if (!containerRef.current) return;

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId: videoId,
                width: "100%",
                height: "100%",
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    vq: "hd1080",
                },
                events: {
                    onReady: (event: any) => {
                        event.target.setPlaybackQuality("hd1080");
                        event.target.playVideo();
                    },
                    onStateChange: (event: any) => {
                        // Force 1080p when playback actually begins
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            event.target.setPlaybackQuality("hd1080");
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [videoId]);

    return (
        <div className="w-full h-full bg-black">
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}