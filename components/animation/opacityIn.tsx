'use client';

import { cubicBezier, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export default function AnimationOpacityIn({ className, children, delay }: Props) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { opacity: [0, 1] },
      {
        duration: 0.3,
        delay,
        ease: cubicBezier(0.65, 0, 0.35, 1),
      },
    );
  }, []);

  return (
    <div className={twMerge('h-full w-full overflow-hidden', className)}>
      <div ref={scope} className="h-full w-full opacity-0">
        {children}
      </div>
    </div>
  );
}
