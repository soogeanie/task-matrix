type InputTextProps = {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

const InputText = ({
  label,
  name,
  ...inputAttrs
}: InputTextProps) => {
  return (
    <div>
      <label htmlFor={inputAttrs.id} className="sr-only">{label}</label>

      <input
        type="text"
        name={name || inputAttrs.id}
        {...inputAttrs}
      />
    </div>
  )
}

export default InputText