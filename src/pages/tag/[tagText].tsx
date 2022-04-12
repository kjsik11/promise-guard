import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import PromiseCard from '@frontend/components/custom/promise/PromiseCard';
import { tagWhiteList } from '@frontend/define/tag-white-list';
import useUser from '@frontend/hooks/use-user';

import type { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  promiseItems: PromiseTypeFront[];
  tagKey: string;
}

export default function PromiseDetailPage({ promiseItems, tagKey }: Props) {
  const { viewArray } = useUser();

  return (
    <div className="pt-12">
      <p className="px-4 text-3xl font-bold text-PC-800">#{tagKey}</p>
      <section className="mt-4 min-h-[500px] space-y-4 bg-gray-100 p-4">
        {promiseItems.map((item, idx) => (
          <PromiseCard
            isView={viewArray.includes(item._id as string)}
            tagPrefix={`tagpromise-tag-${idx}`}
            promiseItem={item}
            key={`tagpromise-card-${idx}`}
          />
        ))}
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tagKeyArr = tagWhiteList.map((tag) => ({
    params: {
      tagText: String(tag),
    },
  }));

  return { fallback: false, paths: tagKeyArr };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    if (!params || typeof params.tagText !== 'string') throw new Error('No such page params');

    const tagKey = params.tagText;

    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find(
        { tags: tagKey, deletedAt: null },
        { projection: { createdAt: 0, body: 0, deletedAt: 0 } },
      )
      .sort({ viewCount: -1 })
      .toArray()) as PromiseTypeFront[];

    if (promiseItems.length === 0) throw new Error('[getStaticProps]: failed to fetch');

    return {
      props: JSON.parse(
        JSON.stringify({
          promiseItems,
          tagKey,
        }),
      ),
      revalidate: 120,
    };
  } catch (err) {
    console.log('[tag search page]', (err as any).message);

    return { props: [], notFound: true };
  }
};
