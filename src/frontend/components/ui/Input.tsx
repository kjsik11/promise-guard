import clsx from 'clsx';

import type { ChangeEventHandler } from 'react';

interface Props {
  className?: string;
  inputClassName?: string;
  label: string;
  value: string | ReadonlyArray<string> | number | undefined;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  maxLength: number;
  autofocus?: boolean;
}

export default function InputComponent({
  placeholder,
  className,
  onChange,
  autofocus = false,
  value,
  label,
  inputClassName,
  maxLength,
}: Props) {
  return (
    <div className={className}>
      <div>
        <label className="text-xs text-gray-400">{label}</label>
      </div>
      <input
        autoFocus={autofocus}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={clsx(
          'min-w-[200px] rounded-md border border-gray-500 py-1 px-2',
          inputClassName,
        )}
      />
    </div>
  );
}
