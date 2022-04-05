import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import CategoryCircle from '@frontend/components/custom/CategoryCircle';
import Countdown from '@frontend/components/custom/Countdown';
import KakaoChannel from '@frontend/components/custom/KakaoChannel';
import type { PromiseProps } from '@frontend/components/custom/promise/PromiseSections';
import PromiseSections from '@frontend/components/custom/promise/PromiseSections';
import MainLayout from '@frontend/components/layout/MainLayout';
import { categoryCircleItems } from '@frontend/define/category-circle-arr';
import { lifePromiseTags } from '@frontend/define/life-promise';
import { localeTags } from '@frontend/define/locale-image-circle';
import { tenPromiseTags } from '@frontend/define/ten-promise-arr';

import type { GetStaticProps } from 'next';

export default function IndexPage({ promiseItems }: { promiseItems: PromiseTypeFront[] }) {
  const [booleanPromiseItems, setBooleanPromiseItems] = useState<PromiseTypeFront[]>([]);
  const [localePromiseItems, setLocalePromiseItems] = useState<PromiseTypeFront[]>([]);
  const [tenPromiseItems, setTenPromiseItems] = useState<PromiseTypeFront[]>([]);
  const [lifePromiseItems, setLifePromiseItems] = useState<PromiseTypeFront[]>([]);

  useEffect(() => {
    // filter boolean promise items
    setBooleanPromiseItems(
      promiseItems
        .sort(
          (
            { recommendedCount: prevRec, notRecommendedCount: prevNrec },
            { recommendedCount: nextRec, notRecommendedCount: nextNRec },
          ) => nextRec - nextNRec - (prevRec - prevNrec),
        )
        .slice(0, 5),
    );

    // filter local promise items
    setLocalePromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (localeTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );

    // filter ten promise items
    setTenPromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (tenPromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );

    // filter life promise items
    setLifePromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (lifePromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );
  }, [promiseItems]);

  return (
    <div>
      <section className="relative flex flex-col items-center space-y-4 bg-PC-800 py-12 px-16 text-center text-white">
        <p className="text-2xl font-bold">
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
      <section className="py-[76px] pb-12">
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
        <div className="my-4 bg-white text-center">태그 자리</div>
      </section>
      <section>
        <PromiseSections
          localePromiseItems={localePromiseItems}
          booleanPromiseItems={booleanPromiseItems}
          tenPromiseItems={tenPromiseItems}
          lifePromiseItems={lifePromiseItems}
          promiseItems={promiseItems}
        />
      </section>
      <KakaoChannel />
    </div>
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

    return {
      props: JSON.parse(
        JSON.stringify({
          promiseItems: promiseItems,
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
