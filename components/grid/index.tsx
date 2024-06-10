import { twMerge } from 'tailwind-merge';

export type GridProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Grid({ className, children }: GridProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-4 gap-[10px] px-[10px] laptop:grid-cols-12 laptop:gap-[16px] laptop:px-[32px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
