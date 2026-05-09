import { useEffect, useState } from 'react';

type Unregister = () => void;

let subscribers: Array<(active: boolean) => void> = [];
let activeIndex = -1;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const KITT_DURATION_MS = 5000;

function pickNext() {
  if (subscribers.length === 0) return;

  let next = activeIndex;
  if (subscribers.length > 1) {
    while (next === activeIndex) {
      next = Math.floor(Math.random() * subscribers.length);
    }
  } else {
    next = 0;
  }

  if (activeIndex !== -1 && subscribers[activeIndex]) {
    subscribers[activeIndex](false);
  }

  activeIndex = next;
  subscribers[activeIndex](true);

  timeoutId = setTimeout(pickNext, KITT_DURATION_MS);
}

function register(cb: (active: boolean) => void): Unregister {
  subscribers.push(cb);

  if (subscribers.length === 1) {
    activeIndex = 0;
    cb(true);
    timeoutId = setTimeout(pickNext, KITT_DURATION_MS);
  }

  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx === -1) return;

    if (activeIndex === idx) {
      cb(false);
      subscribers.splice(idx, 1);
      activeIndex = -1;
      if (timeoutId) clearTimeout(timeoutId);
      if (subscribers.length > 0) pickNext();
    } else {
      if (activeIndex > idx) activeIndex--;
      subscribers.splice(idx, 1);
    }
  };
}

export function useKittScheduler(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    return register(setActive);
  }, []);

  return active;
}
