type InputTextProps = {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

const InputText = ({
  label,
  ...inputAttrs
}: InputTextProps) => {
  return (
    <div>
      <label htmlFor={inputAttrs.id} className="sr-only">{label}</label>

      <input type="text" {...inputAttrs}/>
    </div>
  )
}

export default InputText