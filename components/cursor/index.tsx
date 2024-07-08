import { useEffect, useState } from 'react';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [mouseInWindow, setMouseInWindow] = useState<boolean>(false);
  const [isTargetingAction, setIsTargetingAction] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInWindow) setMouseInWindow(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      // check if the target of one of his parent contains the class 'targeting-action'
      // if so, set isTargetingAction to true
      const target = e.target as HTMLElement;
      setIsTargetingAction(!!target.closest('.targeting-action'));
    };
    const handleMouseOut = () => {
      setMouseInWindow(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
  }, [mouseInWindow]);

  return (
    <div
      className="pointer-events-none fixed z-[10000] hidden pointer-fine:block"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        opacity: mouseInWindow ? 1 : 0,
      }}
    >
      <div className="absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E790C4]"></div>
      <div
        className={`absolute ${isTargetingAction ? 'h-[45px] w-[45px]' : 'h-[25px] w-[25px]'} -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E790C4] bg-opacity-30 transition-all duration-150`}
      ></div>
    </div>
  );
}
