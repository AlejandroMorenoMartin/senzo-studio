import { useEffect, useState, type RefObject } from 'react';

const FPS = 24;

function formatTimecode(seconds: number): string {
  const totalFrames = Math.floor(seconds * FPS);
  const ff = String(totalFrames % FPS).padStart(2, '0');
  const ss = String(Math.floor(seconds) % 60).padStart(2, '0');
  const mm = String(Math.floor(seconds / 60) % 60).padStart(2, '0');
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
  return `${hh}:${mm}:${ss}:${ff}`;
}

export function useFrameCounter(
  videoRef: RefObject<HTMLVideoElement | null>,
  startTime = 0,
  endTime?: number,
) {
  const [timecode, setTimecode] = useState(formatTimecode(startTime));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (endTime !== undefined && video.currentTime >= endTime) {
        video.currentTime = startTime;
        return;
      }
      setTimecode(formatTimecode(video.currentTime - startTime));
    };

    const onLoadedMetadata = () => {
      video.currentTime = startTime;
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    // Si el vídeo ya está cargado cuando se monta el hook
    if (video.readyState >= 1) video.currentTime = startTime;

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [videoRef, startTime, endTime]);

  return timecode;
}
