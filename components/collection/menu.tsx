import ArrowRightSvg from 'icons/arrow-right.svg';
import { twMerge } from 'tailwind-merge';

type MenuItem = {
  value: string | null;
  label: string;
  active: boolean;
};

type CollectionMenuProps = {
  open: boolean;
  menu: MenuItem[];
  onClick: (value: string | null) => void;
};

export default function CollectionMenu({ open, menu, onClick }: CollectionMenuProps) {
  return (
    <div
      className={twMerge(
        'fixed left-[var(--grid-col-px)] top-[193px] overflow-hidden transition-all duration-300 laptop:top-[147px]',
        open
          ? 'w-[calc((100vw-2*var(--grid-col-px)-(var(--grid-col-nb)-1)*var(--grid-col-gap))/var(--grid-col-nb)*2+var(--grid-col-gap))]'
          : 'w-[0px]',
      )}
    >
      <div className="w-[calc((100vw-2*var(--grid-col-px)-(var(--grid-col-nb)-1)*var(--grid-col-gap))/var(--grid-col-nb)*2+var(--grid-col-gap))]">
        {menu.map((item) => {
          return (
            <div key={item.value}>
              <div
                className={twMerge(
                  'mb-[2px] flex cursor-pointer select-none overflow-x-hidden',
                  item.active ? 'text-mud' : 'text-clay-dark',
                )}
                onClick={() => onClick(item.value)}
              >
                {item.active && (
                  <ArrowRightSvg className="mr-[2px] w-[11px] shrink-0 fill-current" />
                )}
                <p className="truncate whitespace-nowrap uppercase">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
