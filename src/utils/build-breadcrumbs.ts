import { lifePromiseTags } from '@frontend/define/life-promise';
import { localeTags } from '@frontend/define/locale-image-circle';
import { tenPromiseArr, tenPromiseTags } from '@frontend/define/ten-promise-arr';

export default function buildBreadcrumbs(categories: string[]) {
  const breadcrumbs: string[] = [];

  let filterFlag: boolean = false;

  // fileter ten
  categories.forEach((category) => {
    if (tenPromiseTags.includes(category)) filterFlag = true;
  });

  if (filterFlag) {
    breadcrumbs.push('10대 공약');
    categories.forEach((val, idx) => {
      if (idx === 0) {
        breadcrumbs.push(
          tenPromiseArr[tenPromiseArr.findIndex(({ value }) => value === val)].label,
        );
      } else breadcrumbs.push(val);
    });
    return breadcrumbs.slice(0, 3);
  }

  // filter locale
  categories.forEach((category) => {
    if (localeTags.includes(category)) filterFlag = true;
  });

  if (filterFlag) {
    breadcrumbs.push('지역 공약');
    categories.forEach((val) => breadcrumbs.push(val));
    return breadcrumbs.slice(0, 3);
  }

  // filter life
  categories.forEach((category) => {
    if (lifePromiseTags.includes(category)) filterFlag = true;
  });

  if (filterFlag) {
    breadcrumbs.push('생활 공약');
    categories.forEach((val) => breadcrumbs.push(val));
    return breadcrumbs.slice(0, 3);
  }
}
