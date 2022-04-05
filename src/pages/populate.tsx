import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import PopulatePromise from '@frontend/components/custom/promise/PopulatePromise.tsx';

import type { GetStaticProps } from 'next';

interface Props {
  populateItems: PromiseTypeFront[];
}

export default function PopulatePromisePage({ populateItems }: Props) {
  return (
    <div className="pt-12">
      <PopulatePromise isDetailPage populateItems={populateItems} />
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

    return {
      props: JSON.parse(
        JSON.stringify({
          populateItems: promiseItems.slice(0, 5),
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
