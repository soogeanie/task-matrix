import clsx from 'clsx';

type InputTextProps = {
  id: string;
  label: string;
  className?: string;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  secondary?: boolean;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_STYLES = {
  DEFAULT: 'bg-white focus:ring-violet-400 focus:border-violet-400',
  SECONDARY: 'bg-gray-100 focus:ring-emerald-800 focus:border-emerald-800'
}

const InputText = ({
  label,
  name,
  className,
  secondary = false,
  handleOnChange,
  ...inputAttrs
}: InputTextProps) => {
  return (
    <>
      <label className="sr-only" htmlFor={inputAttrs.id}>
        {label}
      </label>

      <input
        type="text"
        className={clsx([
          "block w-full px-4 py-1.5 rounded-md text-base font-semibold text-gray-900 leading-8 shadow-sm placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inset",
          "invalid:[&:not(:placeholder-shown)]:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600",
          secondary ? INPUT_STYLES.SECONDARY : INPUT_STYLES.DEFAULT,
          className
        ])}
        name={name || inputAttrs.id}
        {...inputAttrs}
        onChange={(event) => !!handleOnChange && handleOnChange(event)}
      />
    </>
  )
}

export default InputText