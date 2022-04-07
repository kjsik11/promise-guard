export default function compressCategoryText(category: string) {
  switch (category) {
    case '코로나19 극복 회복과 도약':
      return '코로나19';
    case '행복경제시대, 성장과 복지의 선순환':
      return '성장·복지';
    case '공정과 상식의 회복, 대한민국 정상화':
      return '대한민국 정상화';
    case '따뜻한 동행, 모두가 행복한 대한민국':
      return '대상별 복지';
    case '당당한 외교, 튼튼한 안보':
      return '외교 · 안보';
    case '담대한 미래, 자율과 창의가 존중되는 나라':
      return '교육 과학기술';
    case '맑고 깨끗한 환경, 탄소중립을 도약의 계기로':
      return '환경 탄소중립';
    case '안심 대한민국, 모두가 안전한 나라':
      return '국민안전';
    case '균형발전, 골고루 잘사는 대한민국':
      return '균형발전';
    case '국정혁신, 디지털 플랫폼 정부':
      return '국정혁신';
    default:
      return category;
  }
}
