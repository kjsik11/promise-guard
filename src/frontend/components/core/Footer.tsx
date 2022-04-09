import { useState } from 'react';

import WithdrawalModal from '@frontend/components/ui/WithdrawalModal';
import Logo from '@frontend/components/vector/Logo';
import useUser from '@frontend/hooks/use-user';

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const { user, mutate } = useUser();

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
        {user && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            회원탈퇴
          </button>
        )}
      </div>
      <WithdrawalModal mutate={mutate} show={showModal} close={() => setShowModal(false)} />
    </footer>
  );
}
