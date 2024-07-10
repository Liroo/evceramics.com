import ArrowRightSvg from 'icons/arrow-right.svg';
import { twMerge } from 'tailwind-merge';

type MenuItem = {
  value: string | null;
  label: string;
  active: boolean;
  children?: Omit<MenuItem, 'children'>[];
};

type CollectionMenuProps = {
  open: boolean;
  menu: MenuItem[];
  onClick: (_value: string | null, _childValue?: string | null) => void;
};

export default function CollectionMenu({ open, menu, onClick }: CollectionMenuProps) {
  return (
    <div
      className={twMerge(
        'fixed left-[var(--grid-col-px)] top-[193px] overflow-hidden transition-all duration-300 laptop:top-[147px]',
        open
          ? 'w-[calc((100vw-2*var(--grid-col-px)-(var(--grid-col-nb)-1)*var(--grid-col-gap))/var(--grid-col-nb)*2+var(--grid-col-gap))] opacity-100'
          : 'w-[0px] opacity-0',
      )}
    >
      <div className="w-[calc((100vw-2*var(--grid-col-px)-(var(--grid-col-nb)-1)*var(--grid-col-gap))/var(--grid-col-nb)*2+var(--grid-col-gap))]">
        {menu.map((item) => {
          return (
            <div key={item.value}>
              <div
                className={twMerge(
                  'targeting-action mb-[2px] flex select-none overflow-x-hidden transition-colors duration-200',
                  item.active ? 'text-mud' : 'text-clay-dark hover:text-mud',
                )}
                onClick={() => onClick(item.value, null)}
              >
                {item.active && (
                  <ArrowRightSvg className="mr-[2px] w-[11px] shrink-0 fill-current" />
                )}
                <p className="truncate whitespace-nowrap uppercase">{item.label}</p>
              </div>
              {item.children && (
                <div className="mb-[10px] ml-[13px]">
                  {item.children?.map((child) => {
                    return (
                      <div
                        key={child.value}
                        className={twMerge(
                          'targeting-action mb-[1px] flex select-none overflow-x-hidden',
                          child.active ? 'text-mud' : 'text-clay-dark',
                        )}
                        onClick={() => onClick(item.value, child.value)}
                      >
                        <p className="truncate whitespace-nowrap lowercase">{child.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
