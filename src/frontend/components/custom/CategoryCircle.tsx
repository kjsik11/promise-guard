import type { CategoryCircleItem } from '@frontend/define/category-circle-arr';

export default function CategoryCircle({ svg: SvgTag, label }: CategoryCircleItem) {
  return (
    <div>
      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-3">
        <SvgTag />
      </button>
      <p className="pt-1.5 text-center text-xs font-semibold text-gray-600">{label}</p>
    </div>
  );
}
