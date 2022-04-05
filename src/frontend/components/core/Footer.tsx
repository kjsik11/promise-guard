import Logo from '@frontend/components/vector/Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 px-4 text-white">
      <Logo />
      <div className="flex space-x-4 pt-6 text-xs font-medium text-gray-400">
        <a href="#">이용약관</a>
        <a href="#">개인정보 처리방침</a>
      </div>
      {/* <div>
        <div className="space-y-1 pt-2">
          <div className="flex space-x-1 text-sm text-gray-400">
            <p className="font-semibold">대표</p>
            <p>이태윤</p>
          </div>
          <div className="flex space-x-1 text-sm text-gray-400">
            <p className="font-semibold">대표 이메일</p>
            <a className="text-white underline" href="mailto: may10.contact@gmail.com">
              may10.contact@gmail.com
            </a>
          </div>
          <div className="flex space-x-1 text-sm text-gray-400">
            <p className="font-semibold">사업자등록번호</p>
            <p>102-56-00661</p>
          </div>
          <div className="flex space-x-1 text-sm text-gray-400">
            <p className="font-semibold">주소</p>
            <p>서울 강서구 우현로 67 107-304</p>
          </div>
        </div>
      </div> */}
    </footer>
  );
}
