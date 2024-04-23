import clsx from 'clsx';

type InputTextProps = {
  id: string;
  label: string;
  className?: string;
  defaultValue?: string;
  hasError?: boolean;
  hasValue?: boolean;
  maxLength?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
  secondary?: boolean;
  validForm?: boolean;
  onHandleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_STYLES = {
  DEFAULT: 'bg-white focus:ring-violet-400 focus:border-violet-400',
  SECONDARY: 'bg-gray-100 focus:ring-emerald-800 focus:border-emerald-800'
}

const InputText = ({
  label,
  name,
  className,
  hasValue,
  secondary = false,
  hasError = false,
  validForm = true,
  onHandleChange,
  ...inputAttrs
}: InputTextProps) => {
  const showError = hasError && !validForm

  const input = document.getElementById(inputAttrs.id) as HTMLInputElement
  let errorMessage = ''

  if (!!input && hasError) {
    if (input.validity.tooShort) {
      errorMessage = 'Yikes. Too little characters - the minimum is 3.'
    } else if (input.validity.tooLong) {
      errorMessage = 'Oof. Too many characters - the maximum is 256.'
    }
  }

  input?.setCustomValidity(errorMessage)

  return (
    <>
      <label className="sr-only" htmlFor={inputAttrs.id}>{label}</label>
      
      <div className={clsx("flex flex-col basis-full")}>
        <input
          type="text"
          className={clsx([
            "block w-full px-4 py-1.5 rounded-md text-base font-semibold text-gray-900 leading-8 shadow-sm placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-inset",
            showError && "invalid:[&:not(:placeholder-shown)]:ring-1 invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600",
            secondary ? INPUT_STYLES.SECONDARY : INPUT_STYLES.DEFAULT,
            className
          ])}
          name={name || inputAttrs.id}
          {...inputAttrs}
          onChange={(event) => !!onHandleChange && onHandleChange(event)}
        />
        
        {showError && errorMessage &&
          <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
        }
      </div>
    </>
  )
}

export default InputText