export function removeDuplicatedTags(includeTagsArr: (object & { tags: string[] })[]) {
  const pureTagArray: string[] = [];
  includeTagsArr.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!pureTagArray.includes(tag)) pureTagArray.push(tag);
    });
  });

  return pureTagArray;
}

export function removeDuplicatedCategoris(includeTagsArr: (object & { categories: string[] })[]) {
  const pureTagArray: string[] = [];
  includeTagsArr.forEach(({ categories }) => {
    categories.slice(1).forEach((tag) => {
      if (!pureTagArray.includes(tag)) pureTagArray.push(tag);
    });
  });

  return pureTagArray;
}
