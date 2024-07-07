import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type GridProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Grid({ className, children, ...props }: GridProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-[repeat(var(--grid-col-nb),minmax(0,1fr))] gap-[var(--grid-col-gap)] px-[var(--grid-col-px)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
