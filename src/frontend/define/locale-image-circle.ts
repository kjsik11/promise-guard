import Busan from '@assets/locale-logo/busan.jpg';
import Chungcheongbukdo from '@assets/locale-logo/chungcheongbukdo.jpg';
import Chungcheongnamdo from '@assets/locale-logo/chungcheongnamdo.jpg';
import Daegu from '@assets/locale-logo/daegu.jpg';
import Daejeon from '@assets/locale-logo/daejeon.jpg';
import Gangwondo from '@assets/locale-logo/gangwondo.jpg';
import Gwanju from '@assets/locale-logo/gwanju.jpg';
import Gyeonggido from '@assets/locale-logo/gyeonggido.jpg';
import Gyeongsangbukdo from '@assets/locale-logo/gyeongsangbukdo.jpg';
import Gyeongsangnamdo from '@assets/locale-logo/gyeongsangnamdo.jpg';
import Incheon from '@assets/locale-logo/incheon.jpg';
import Jejudo from '@assets/locale-logo/jejudo.jpg';
import Jeollabukdo from '@assets/locale-logo/jeollabukdo.jpg';
import Jeollanamdo from '@assets/locale-logo/jeollanamdo.jpg';
import Sejong from '@assets/locale-logo/sejong.jpg';
import Seoul from '@assets/locale-logo/seoul.jpg';
import Ulsan from '@assets/locale-logo/ulsan.jpg';

type LocaleImageCircle = {
  image: StaticImageData;
  label: string;
  value: string;
};

export const localeTags = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

export const localeImageArr: LocaleImageCircle[] = [
  {
    image: Seoul,
    label: '서울',
    value: '서울',
  },
  {
    image: Busan,
    label: '부산',
    value: '부산',
  },
  {
    image: Incheon,
    label: '인천',
    value: '인천',
  },
  {
    image: Daegu,
    label: '대구',
    value: '대구',
  },
  {
    image: Daejeon,
    label: '대전',
    value: '대전',
  },
  {
    image: Gwanju,
    label: '광주',
    value: '광주',
  },
  {
    image: Ulsan,
    label: '울산',
    value: '울산',
  },
  {
    image: Sejong,
    label: '세종',
    value: '세종',
  },
  {
    image: Gyeonggido,
    label: '경기도',
    value: '경기',
  },
  {
    image: Gangwondo,
    label: '강원도',
    value: '강원',
  },
  {
    image: Chungcheongnamdo,
    label: '충청남도',
    value: '충남',
  },
  {
    image: Chungcheongbukdo,
    label: '충청북도',
    value: '충북',
  },
  {
    image: Jeollanamdo,
    label: '전라남도',
    value: '전남',
  },
  {
    image: Jeollabukdo,
    label: '전라북도',
    value: '전북',
  },
  {
    image: Gyeongsangnamdo,
    label: '경상남도',
    value: '경남',
  },
  {
    image: Gyeongsangbukdo,
    label: '경상북도',
    value: '경북',
  },
  {
    image: Jejudo,
    label: '제주도',
    value: '제주',
  },
];
