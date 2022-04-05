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

export const localeImageArr: LocaleImageCircle[] = [
  {
    image: Seoul,
    label: '서울',
    value: 'seoul',
  },
  {
    image: Busan,
    label: '부산',
    value: 'busan',
  },
  {
    image: Incheon,
    label: '인천',
    value: 'incheon',
  },
  {
    image: Daegu,
    label: '대구',
    value: 'daegu',
  },
  {
    image: Daejeon,
    label: '대전',
    value: 'daejeon',
  },
  {
    image: Gwanju,
    label: '광주',
    value: 'gwanju',
  },
  {
    image: Ulsan,
    label: '울산',
    value: 'ulsan',
  },
  {
    image: Sejong,
    label: '세종',
    value: 'sejong',
  },
  {
    image: Gyeonggido,
    label: '경기도',
    value: 'gyeonggido',
  },
  {
    image: Gangwondo,
    label: '강원도',
    value: 'gangwondo',
  },
  {
    image: Chungcheongnamdo,
    label: '충청남도',
    value: 'chungcheongnamdo',
  },
  {
    image: Chungcheongbukdo,
    label: '충청북도',
    value: 'chungcheongbukdo',
  },
  {
    image: Jeollanamdo,
    label: '전라남도',
    value: 'jeollanamdo',
  },
  {
    image: Jeollabukdo,
    label: '전라북도',
    value: 'jeollabukdo',
  },
  {
    image: Gyeongsangnamdo,
    label: '경상남도',
    value: 'gyeongsangnamdo',
  },
  {
    image: Gyeongsangbukdo,
    label: '경상북도',
    value: 'gyeongsangbukdo',
  },
  {
    image: Jejudo,
    label: '제주도',
    value: 'jejudo',
  },
];
