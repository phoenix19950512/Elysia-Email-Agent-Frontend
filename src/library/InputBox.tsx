import clsx from "clsx";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  invalidText?: string;
  type?: string;
}

export const InputBox: React.FC<Props> = ({
  label,
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  className,
  disabled,
  inputClassName,
  invalidText,
  type = 'text',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={clsx(className, "flex flex-col gap-2")}>
      {!!label && (
        <label
          className={clsx("leading-[1.6] transition-colors duration-300", {
            "text-red-500": !!invalidText,
            "text-sky-600": !invalidText && isFocused,
            "text-gray-400": disabled,
          })}
        >
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        className={clsx(
          inputClassName,
          "rounded-md border w-full py-2 px-3 focus:outline-none transition-all duration-300",
          !invalidText
            ? "border-gray-700 focus:border-sky-600"
            : "border-red-500",
          { "text-gray-400": disabled }
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      {!!invalidText && (
        <div className="text-red-500 text-sm">{invalidText}</div>
      )}
    </div>
  );
};
