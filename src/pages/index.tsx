import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Script from 'next/script';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import CategoryCircle from '@frontend/components/custom/CategoryCircle';
import Countdown from '@frontend/components/custom/Countdown';
import KakaoChannel from '@frontend/components/custom/KakaoChannel';
import DynamicOLottie from '@frontend/components/custom/lottie/DynamicOLottie';
import DynamicXLottie from '@frontend/components/custom/lottie/DynamicXLottie';
import type { PromiseProps } from '@frontend/components/custom/promise/PromiseSections';
import PromiseSections from '@frontend/components/custom/promise/PromiseSections';
import TagSlider from '@frontend/components/custom/TagSlider';
import MainLayout from '@frontend/components/layout/MainLayout';
import { categoryCircleItems } from '@frontend/define/category-circle-arr';

import { removeDuplicatedTags } from '@utils/remove-duplicated-tags';

import type { GetStaticProps } from 'next';

export default function IndexPage({
  booleanPromiseItems,
  populatePromiseItems,
  pureTags,
}: {
  booleanPromiseItems: PromiseTypeFront[];
  populatePromiseItems: PromiseTypeFront[];
  pureTags: string[];
}) {
  return (
    <>
      <Script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js" />
      <div>
        <section className="relative flex flex-col items-center space-y-4 bg-PC-800 py-12 px-4 text-center text-white">
          <div className="absolute inset-y-0 left-0 pl-2 pb-8">
            <DynamicOLottie />
          </div>
          <div className="absolute inset-y-0 right-0 pr-2 pb-8">
            <DynamicXLottie />
          </div>
          <p className="relative text-2xl font-bold">
            대국민 공약 투표
            <br />
            어떤 공약을 지지하시나요?
          </p>
          <p>
            앞으로 5년, 윤석열 정부가
            <br />꼭 지켜야 하는 공약에 투표해주세요
          </p>
          <Link href="#">
            <a className="flex items-center text-sm font-semibold text-blue-200">
              더 알아보기
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </Link>
          <Countdown isMain />
        </section>
        <section className="mb-6 pt-[76px]">
          <div className="flex justify-center space-x-4">
            {categoryCircleItems.map((item, idx) => (
              <CategoryCircle
                id={item.id}
                svg={item.svg}
                label={item.label}
                key={`category-circle-${item.label}-${idx}`}
              />
            ))}
          </div>
        </section>
        <section>
          <div className="mb-12 overflow-x-hidden bg-white text-center">
            <TagSlider tags={pureTags} />
          </div>
        </section>
        <section>
          <PromiseSections
            populatePromiseItems={populatePromiseItems}
            booleanPromiseItems={booleanPromiseItems}
          />
        </section>
        <KakaoChannel />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<PromiseProps> = async () => {
  try {
    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .sort({ viewCount: -1 })
      .toArray()) as PromiseTypeFront[];

    if (promiseItems.length === 0) throw new Error('[getStaticProps]: failed to fetch');

    const booleanPromiseItems = promiseItems
      .slice()
      .sort((prev, next) => {
        return (
          next.recommendedCount +
          next.notRecommendedCount -
          (prev.recommendedCount + prev.notRecommendedCount)
        );
      })
      .slice(0, 50)
      .sort((prev, next) => {
        return (
          Math.abs(prev.recommendedCount - prev.notRecommendedCount) -
          Math.abs(next.recommendedCount - next.notRecommendedCount)
        );
      })
      .slice(0, 5);

    const pureTags = removeDuplicatedTags(promiseItems);

    return {
      props: JSON.parse(
        JSON.stringify({
          populatePromiseItems: promiseItems.slice(0, 5),
          booleanPromiseItems,
          pureTags,
        }),
      ),
      revalidate: 30,
    };
  } catch (err) {
    console.log('[index page]', (err as any).message);
    return {
      props: [],
      notFound: true,
    };
  }
};

IndexPage.Layout = MainLayout;
