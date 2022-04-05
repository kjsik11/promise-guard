import type { SvgCircleItems } from '@frontend/define/category-circle-arr';

export default function CategoryCircle({ id, svg: SvgTag, label }: SvgCircleItems) {
  return (
    <div>
      <button
        onClick={() => {
          const elem = document.getElementById(id);

          if (elem) {
            const positionTop = elem.getBoundingClientRect().top;
            window.scrollTo({ top: positionTop - 64, behavior: 'smooth' });
          }
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-3"
      >
        <SvgTag />
      </button>
      <p className="pt-1.5 text-center text-xs font-semibold text-gray-600">{label}</p>
    </div>
  );
}
