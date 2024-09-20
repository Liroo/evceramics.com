import { HTMLMotionProps, motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';

type PageTransitionProps = HTMLMotionProps<'div'>;

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const transition = { duration: 0.3, ease: 'easeInOut' };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={transition}
      className="h-full w-full"
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
