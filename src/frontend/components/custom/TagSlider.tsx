import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function TagSlider({ tags, className }: { tags: string[]; className?: string }) {
  const [sliderWidth, setSliderWidth] = useState<[number, number, number]>([3800, 3800, 3800]);

  const sliceTagArr = useMemo(() => {
    return [tags.slice(0, 20), tags.slice(20, 40), tags.slice(40)];
  }, [tags]);

  useEffect(() => {
    const sliderElem = document.getElementsByClassName('slider-item');

    setSliderWidth([
      sliderElem[0].scrollWidth,
      sliderElem[1].scrollWidth,
      sliderElem[2].scrollWidth,
    ]);
  }, []);

  if (!sliceTagArr) return null;

  return (
    <div className={className}>
      <div
        style={{ width: sliderWidth[0] }}
        className={clsx('slider-left inline-flex flex-1 items-center space-x-2', 'slider-item')}
      >
        {[...sliceTagArr[0], ...sliceTagArr[0]].map((tag, idx) => (
          <Link href={`/tag/${tag}`} key={`tag-slider-${tag}-${idx}`}>
            <a className="shrink-0 rounded-full bg-PC-600 py-0.5 px-2.5 font-semibold text-white">
              #{tag}
            </a>
          </Link>
        ))}
      </div>
      <div
        style={{ width: sliderWidth[1] }}
        className={clsx(
          'slider-right mt-4 inline-flex flex-1 items-center space-x-2',
          'slider-item',
        )}
      >
        {[...sliceTagArr[1], ...sliceTagArr[1]].map((tag, idx) => (
          <Link href={`/tag/${tag}`} key={`tag-slider2-${tag}-${idx}`}>
            <a className="shrink-0 rounded-full bg-PC-600 py-0.5 px-2.5 font-semibold text-white">
              #{tag}
            </a>
          </Link>
        ))}
      </div>
      <div
        style={{ width: sliderWidth[1] }}
        className={clsx(
          'slider-left2 mt-4 inline-flex flex-1 items-center space-x-2',
          'slider-item',
        )}
      >
        {[...sliceTagArr[2], ...sliceTagArr[2]].map((tag, idx) => (
          <Link href={`/tag/${tag}`} key={`tag-slider2-${tag}-${idx}`}>
            <a className="shrink-0 rounded-full bg-PC-600 py-0.5 px-2.5 font-semibold text-white">
              #{tag}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
