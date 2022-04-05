import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import BooleanPromise from '@frontend/components/custom/promise/BooleanPromise';

import type { GetStaticProps } from 'next';

interface Props {
  booleanPromiseItems: PromiseTypeFront[];
}

export default function BooleanPromisePage({ booleanPromiseItems }: Props) {
  return (
    <div className="pt-12">
      <BooleanPromise isDetailPage booleanPromiseItems={booleanPromiseItems} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .sort({ viewCount: -1 })
      .toArray()) as PromiseTypeFront[];

    if (promiseItems.length === 0) throw new Error('[getStaticProps]: failed to fetch');

    const booleanPromiseItems = promiseItems
      .sort(
        (
          { recommendedCount: prevRec, nonRecommendedCount: prevNrec },
          { recommendedCount: nextRec, nonRecommendedCount: nextNRec },
        ) => nextRec - nextNRec - (prevRec - prevNrec),
      )
      .slice(0, 5);

    return {
      props: JSON.parse(
        JSON.stringify({
          booleanPromiseItems,
        }),
      ),
      revalidate: 30,
    };
  } catch (err) {
    return {
      props: [],
      notFound: true,
    };
  }
};
