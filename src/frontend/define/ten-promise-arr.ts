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

export const tenPromiseTags = [
  '코로나19 극복 회복과 도약 ',
  '행복경제시대, 성장과 복지의 선순환',
  '공정과 상식의 회복, 대한민국 정상화',
  '따뜻한 동행, 모두가 행복한 대한민국',
  '당당한 외교, 튼튼한 안보',
  '담대한 미래, 자율과 창의가 존중되는 나라',
  '맑고 깨끗한 환경, 탄소중립을 도약의 계기로',
  '안심 대한민국, 모두가 안전한 나라',
  '균형발전, 골고루 잘사는 대한민국',
  '국정혁신, 디지털 플랫폼 정부',
];

export type tenCircleItems = {
  svg: ({ className }: { className?: string }) => JSX.Element;
  label: string;
  value: string;
};

export const tenPromiseArr: tenCircleItems[] = [
  {
    svg: Syringe,
    label: '코로나19',
    value: '코로나19 극복 회복과 도약 ',
  },
  {
    svg: ChartBar,
    label: '성장·복지',
    value: '행복경제시대, 성장과 복지의 선순환',
  },
  {
    svg: Building,
    label: '대한민국\n정상화',
    value: '공정과 상식의 회복, 대한민국 정상화',
  },
  {
    svg: Users,
    label: '대상별 복지',
    value: '따뜻한 동행, 모두가 행복한 대한민국',
  },
  {
    svg: Shield,
    label: '외교·안보',
    value: '당당한 외교, 튼튼한 안보',
  },
  {
    svg: Brain,
    label: '교육\n과학기술',
    value: '담대한 미래, 자율과 창의가 존중되는 나라',
  },
  {
    svg: Leaf,
    label: '환경\n탄소중립',
    value: '맑고 깨끗한 환경, 탄소중립을 도약의 계기로',
  },
  {
    svg: Home,
    label: '국민안전',
    value: '안심 대한민국, 모두가 안전한 나라',
  },
  {
    svg: Road,
    label: '균형발전',
    value: '균형발전, 골고루 잘사는 대한민국',
  },
  {
    svg: Library,
    label: '국정혁신',
    value: '국정혁신, 디지털 플랫폼 정부',
  },
];
