'use client';

import anime from 'animejs';
import { TransitionRouter } from 'next-transition-router';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={async (next) => {
        anime({
          targets: 'main',
          duration: 250,
          opacity: 0,
          easing: 'easeInOutQuad',
          complete: () => next(),
        });
      }}
      enter={async (next) => {
        anime({
          targets: 'main',
          duration: 250,
          opacity: 1,
          easing: 'easeInOutQuad',
          complete: () => next(),
        });
      }}
    >
      {children}
    </TransitionRouter>
  );
}
