'use client';

import { PropsWithChildren, useContext, useRef } from 'react';

import { usePathname } from 'lib/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function FrozenRouter(props: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
  );
}

type LayoutProviderAnimateProps = {
  children: React.ReactNode;
};

export default function LayoutProviderAnimate({ children }: LayoutProviderAnimateProps) {
  const pathname = usePathname();

  return (
    // <AnimatePresence mode="wait">
    //   <motion.div
    //     key={pathname}
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     transition={{ duration: 0.2, ease: 'easeInOut' }}
    //     className="h-full w-full"
    //   >
    //     <FrozenRouter>
    //       {children}
    //       </FrozenRouter>
    //   </motion.div>
    // </AnimatePresence>
    <>{children}</>
  );
}
