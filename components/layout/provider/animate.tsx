'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'lib/navigation';

type LayoutProviderAnimateProps = {
  children: React.ReactNode;
};

export default function LayoutProviderAnimate({ children }: LayoutProviderAnimateProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
