import { useCallback, useEffect, useRef, useState } from 'react';

export function useBeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getPosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDragging.current) getPosition(e.clientX);
    };
    const onUp = () => { isDragging.current = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [getPosition]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    getPosition(e.clientX);
  }, [getPosition]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    getPosition(e.touches[0].clientX);
  }, [getPosition]);

  return { position, containerRef, onMouseDown, onTouchMove };
}
