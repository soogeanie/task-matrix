type InputTextProps = {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  onBlur: (text: string) => void;
}

const InputText = ({
  onBlur,
  label,
  ...inputAttrs
}: InputTextProps) => {
  return (
    <div>
      <label htmlFor={inputAttrs.id} className="sr-only">{label}</label>

      <input
        type="text"
        {...inputAttrs}
        onBlur={(event) => onBlur(event.target.value)}
      />
    </div>
  )
}

export default InputText