import clsx from "clsx";

interface SwitchWithLabelProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const SwtichWithLabel: React.FC<SwitchWithLabelProps> = ({
  value,
  onChange,
  className,
  disabled,
}) => {
  return (
    <div className={clsx(className, "flex items-center gap-4 form-switch")}>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={clsx(
          "relative cursor-pointer inline-flex h-6 min-w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-sky-600 focus:ring-offset-2 disabled:opacity-20",
          value ? "bg-sky-600 disabled:bg-sky-600/20" : "bg-gray-700"
        )}
        onClick={() => onChange(!value)}
        disabled={disabled}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            value ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
};
