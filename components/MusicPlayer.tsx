"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Add your songs here — files go in public/assets/music/
const PLAYLIST = [
  { title: "Track 1", file: "/assets/music/track1.mp3" },
  { title: "Track 2", file: "/assets/music/track2.mp3" },
  { title: "Track 3", file: "/assets/music/track3.mp3" },
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
  const [queue, setQueue] = useState(() => shuffle(PLAYLIST));
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const progressInterval = useRef<ReturnType<typeof setInterval>>();

  const current = queue[trackIndex] || PLAYLIST[0];

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

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Auto-play on track change (if was playing)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (playing) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [trackIndex, queue]);

  // Progress tracking
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

      {/* Collapsed: just a play button */}
      {!expanded && (
        <button
          className="mp-fab"
          onClick={() => setExpanded(true)}
          aria-label="Open music player"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        </button>
      )}

      {/* Expanded player */}
      {expanded && (
        <div className="mp-panel">
          {/* Close */}
          <button
            className="mp-close"
            onClick={() => setExpanded(false)}
            aria-label="Close player"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Track name */}
          <div className="mp-track">{current.title}</div>

          {/* Progress bar */}
          <div className="mp-progress-wrap" onClick={seek}>
            <div
              className="mp-progress-fill"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            />
          </div>

          <div className="mp-time">
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>

          {/* Controls */}
          <div className="mp-controls">
            <button className="mp-btn" onClick={prev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button className="mp-btn mp-btn-play" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button className="mp-btn" onClick={next} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Volume */}
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
        </div>
      )}
    </div>
  );
}
