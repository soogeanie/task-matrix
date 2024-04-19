import clsx from 'clsx';

type InputTextProps = {
  id: string;
  label: string;
  className?: string;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  label,
  name,
  className,
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
        className={clsx("block w-full rounded-md border-0 px-4 py-1.5 shadow-sm text-base font-semibold text-gray-900 leading-8 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-400", className)}
        name={name || inputAttrs.id}
        maxLength={255}
        {...inputAttrs}
        onChange={(event) => !!handleOnChange && handleOnChange(event)}
      />
    </>
  )
}

export default InputText