import Logo from '@frontend/components/vector/Logo';
import useUser from '@frontend/hooks/use-user';

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="bg-gray-900 py-12 px-4 text-white">
      <Logo />
      <div className="flex space-x-4 pt-6 text-xs font-medium text-gray-400">
        <a
          target="_blank"
          href="https://merciful-son-52b.notion.site/c70ed37d893049b28377b45852b84a22"
          rel="noreferrer"
        >
          이용약관
        </a>
        <a
          target="_blank"
          href="https://merciful-son-52b.notion.site/a6b7f58743e446d8b4dd121c2f8e5ab2"
          rel="noreferrer"
        >
          개인정보 처리방침
        </a>
        {user && <a href="#">회원탈퇴</a>}
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
