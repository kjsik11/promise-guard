import {
  DrinkCategory,
  FireCategory,
  FlagCategory,
  MarkerCategory,
  StarCategory,
} from '@frontend/components/vector';

import {
  booleanSectionId,
  lifeSectionId,
  localeSectionId,
  populateSectionId,
  tenSectionId,
} from './promise-section-ids';

export type SvgCircleItems = {
  svg: ({ className }: { className?: string }) => JSX.Element;
  label: string;
  id: string;
};

export const categoryCircleItems: SvgCircleItems[] = [
  {
    svg: StarCategory,
    label: '인기 공약',
    id: populateSectionId,
  },
  {
    svg: FireCategory,
    label: '찬반 공약',
    id: booleanSectionId,
  },
  {
    svg: FlagCategory,
    label: '10대 공약',
    id: tenSectionId,
  },
  {
    svg: MarkerCategory,
    label: '지역 공약',
    id: localeSectionId,
  },
  {
    svg: DrinkCategory,
    label: '생활 공약',
    id: lifeSectionId,
  },
];
