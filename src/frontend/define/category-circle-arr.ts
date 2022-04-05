import {
  DrinkCategory,
  FireCategory,
  FlagCategory,
  MarkerCategory,
  StarCategory,
} from '@frontend/components/vector';

export type SvgCircleItems = {
  svg: ({ className }: { className?: string }) => JSX.Element;
  label: string;
};

export const categoryCircleItems: SvgCircleItems[] = [
  {
    svg: StarCategory,
    label: '인기 공약',
  },
  {
    svg: FireCategory,
    label: '찬반 공약',
  },
  {
    svg: FlagCategory,
    label: '10대 공약',
  },
  {
    svg: MarkerCategory,
    label: '지역 공약',
  },
  {
    svg: DrinkCategory,
    label: '생활 공약',
  },
];
