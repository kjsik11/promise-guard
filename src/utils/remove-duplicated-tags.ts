export default function removeDuplicatedTags(includeTagsArr: (object & { tags: string[] })[]) {
  const pureTagArray: string[] = [];
  includeTagsArr.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!pureTagArray.includes(tag)) pureTagArray.push(tag);
    });
  });

  return pureTagArray;
}
