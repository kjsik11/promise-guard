import { Menu, Transition } from '@headlessui/react';
import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import NextLink from 'next/link';
import { Fragment } from 'react';

import Logo from '@frontend/components/vector/Logo';

const menuItems = [
  { label: '프로젝트 소개', href: '#' },
  { label: '의견 제보', href: '#' },
  { label: '공약 출처', href: '#' },
  { label: '공약 정정·추가 요청', href: '#' },
  { label: '로그인', href: '#' },
];

export default function Header() {
  return (
    <header className="sticky inset-x-0 flex h-14 items-center justify-between p-4">
      <NextLink href="/">
        <a>
          <Logo className="text-black" />
        </a>
      </NextLink>
      <div className="space-x-6">
        <button>
          <SearchIcon className="h-5 w-5" />
        </button>

        <Menu as="div" className="relative inline-block text-left">
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
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <nav className="py-1">
                {menuItems.map((item, idx) => (
                  <Menu.Item key={`nav-item-${item.label}-${idx}`}>
                    <NextLink href={item.href}>
                      <a
                        className={clsx(
                          'flex w-full items-center px-4 py-2 transition-colors hover:bg-violet-400',
                          {
                            'mt-1 border-t border-gray-200': item.label === '로그인',
                          },
                        )}
                      >
                        {item.label}
                      </a>
                    </NextLink>
                  </Menu.Item>
                ))}
              </nav>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
