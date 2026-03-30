"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const PLAYLIST = [
  { title: "Can't Decide", artist: "Max Dean", cover: "", file: "/assets/music/Can't Decide.mp3" },
  { title: "Never Alone", artist: "Lizzy Land", cover: "", file: "/assets/music/Never Alone (feat. Lizzy Land)_spotdown.org.mp3" },
  { title: "TESLA", artist: "Unknown", cover: "", file: "/assets/music/TESLA_spotdown.org.mp3" },
  { title: "Too Cool To Be Careless", artist: "Unknown", cover: "", file: "/assets/music/TOO COOL TO BE CARELESS_spotdown.org.mp3" },
  { title: "In The Yuma", artist: "Aatig", cover: "", file: "/assets/music/[SPOTIFY-DOWNLOADER.COM] In The Yuma (feat. Aatig).mp3" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [queue, setQueue] = useState(() => shuffle(PLAYLIST));
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const progressInterval = useRef<ReturnType<typeof setInterval>>(undefined);

  const current = queue[trackIndex] || PLAYLIST[0];

  // Listen for the easter egg event
  useEffect(() => {
    const handler = () => {
      setUnlocked(true);
      setExpanded(true);
      // Auto-play after a tiny delay so the UI renders first
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
        setPlaying(true);
      }, 100);
    };
    window.addEventListener("easter-egg-music", handler);
    return () => window.removeEventListener("easter-egg-music", handler);
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const next = useCallback(() => {
    const nextIdx = (trackIndex + 1) % queue.length;
    if (nextIdx === 0) setQueue(shuffle(PLAYLIST));
    setTrackIndex(nextIdx);
    setProgress(0);
  }, [trackIndex, queue.length]);

  const prev = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    setTrackIndex((trackIndex - 1 + queue.length) % queue.length);
    setProgress(0);
  }, [trackIndex, queue.length]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (playing) audioRef.current.play().catch(() => {});
    }
  }, [trackIndex, queue]);

  useEffect(() => {
    if (playing) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
          setDuration(audioRef.current.duration || 0);
        }
      }, 250);
    } else {
      clearInterval(progressInterval.current);
    }
    return () => clearInterval(progressInterval.current);
  }, [playing]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
    setProgress(pct * duration);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  // Hidden until easter egg is found
  if (!unlocked) {
    return <audio ref={audioRef} src={current.file} onEnded={next} preload="none" />;
  }

  return (
    <div className={`mp ${expanded ? "mp-expanded" : ""}`}>
      <audio
        ref={audioRef}
        src={current.file}
        onEnded={next}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
      />

      {/* Collapsed: spinning vinyl disc */}
      {!expanded && (
        <button
          className={`mp-disc-btn ${playing ? "mp-disc-spinning" : ""}`}
          onClick={() => setExpanded(true)}
          aria-label="Open music player"
        >
          <div className="mp-disc">
            {current.cover ? (
              <img src={current.cover} alt="" className="mp-disc-img" />
            ) : (
              <div className="mp-disc-default" />
            )}
            <div className="mp-disc-hole" />
          </div>
        </button>
      )}

      {/* Expanded player */}
      {expanded && (
        <div className="mp-panel">
          <div className="mp-vinyl-wrap">
            <div className={`mp-vinyl ${playing ? "mp-vinyl-spinning" : ""}`}>
              {current.cover ? (
                <img src={current.cover} alt="" className="mp-vinyl-img" />
              ) : (
                <div className="mp-vinyl-default" />
              )}
              <div className="mp-vinyl-hole" />
              <div className="mp-vinyl-ring mp-vinyl-ring-1" />
              <div className="mp-vinyl-ring mp-vinyl-ring-2" />
              <div className="mp-vinyl-ring mp-vinyl-ring-3" />
            </div>
          </div>

          <div className="mp-info">
            <div className="mp-track">{current.title}</div>
            <div className="mp-artist">{current.artist}</div>
          </div>

          <div className="mp-progress-wrap" onClick={seek}>
            <div className="mp-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="mp-time">
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>

          <div className="mp-controls">
            <button className="mp-btn" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>
            <button className="mp-btn mp-btn-play" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button className="mp-btn" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div className="mp-bottom">
            <div className="mp-volume">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="mp-volume-slider"
              />
            </div>
            <button
              className="mp-minimize"
              onClick={() => setExpanded(false)}
              aria-label="Minimize"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="4 14 10 14 10 20" />
                <line x1="20" y1="4" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
