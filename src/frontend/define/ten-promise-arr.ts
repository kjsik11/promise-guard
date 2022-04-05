import {
  Brain,
  Building,
  ChartBar,
  Home,
  Leaf,
  Library,
  Road,
  Shield,
  Syringe,
  Users,
} from '@frontend/components/vector/ten-promise';

import type { SvgCircleItems } from './category-circle-arr';

export const tenPromiseArr: SvgCircleItems[] = [
  {
    svg: Syringe,
    label: '코로나19',
  },
  {
    svg: ChartBar,
    label: '성장·복지',
  },
  {
    svg: Building,
    label: '대한민국\n정상화',
  },
  {
    svg: Users,
    label: '대상별 복지',
  },
  {
    svg: Shield,
    label: '외교·안보',
  },
  {
    svg: Brain,
    label: '교육\n과학기술',
  },
  {
    svg: Leaf,
    label: '환경\n탄소중립',
  },
  {
    svg: Home,
    label: '국민안전',
  },
  {
    svg: Road,
    label: '균형발전',
  },
  {
    svg: Library,
    label: '국정혁신',
  },
];
