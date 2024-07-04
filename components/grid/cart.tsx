import { twMerge } from 'tailwind-merge';

export type GridCartProps = {
  className?: string;
  children: React.ReactNode;
};

export default function GridCart({ className, children }: GridCartProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-4 gap-[var(--grid-col-gap)] px-[var(--grid-col-px)] laptop:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
