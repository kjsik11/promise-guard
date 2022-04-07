import { Menu, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import { Fragment } from 'react';

import Logo from '@frontend/components/vector/Logo';
import useUser from '@frontend/hooks/use-user';

const menuItems = [
  { label: '오월,십일 소개', href: 'introduce' },
  { label: '의견 제보 · 공약 수정 요청', href: 'https://forms.gle/MPon2wu38gHxz2KU8' },
];

export default function Header() {
  const { user, handleSignout, handleSignin } = useUser();

  return (
    <header className="fixed inset-x-0 top-0 z-[1] bg-white/60 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between p-4">
        <NextLink href="/">
          <a>
            <Logo className="text-black" />
          </a>
        </NextLink>

        <Menu as="div" className="relative inline-block h-5 text-left">
          <div>
            <Menu.Button>
              <MenuIcon className="h-5 w-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <nav className="py-1">
                {menuItems.map((item, idx) => (
                  <Menu.Item as={'button'} className="w-full" key={`nav-item-${item.label}-${idx}`}>
                    <NextLink href={item.href}>
                      <a
                        target={item.href.split('https://').length > 1 ? '_blank' : '_self'}
                        referrerPolicy={
                          item.href.split('https://').length > 1 ? 'no-referrer' : 'origin'
                        }
                        className="flex w-full items-center px-4 py-2"
                      >
                        {item.label}
                      </a>
                    </NextLink>
                  </Menu.Item>
                ))}
              </nav>
              <div>
                {user && (
                  <Menu.Item as={'button'} className="w-full">
                    <NextLink href="/my-promise">
                      <a className="flex w-full items-center px-4 py-2">내 공약</a>
                    </NextLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <button
                    onClick={() => {
                      if (user) handleSignout();
                      else handleSignin();
                    }}
                    className="flex w-full items-center px-4 py-2 transition-colors"
                  >
                    {user ? '로그아웃' : '로그인'}
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
