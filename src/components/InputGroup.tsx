type InputGroupProps = {
  children: React.ReactNode;
}

const InputGroup = ({ children }: InputGroupProps) => {
  return (
    <div role="group" className="py-2 flex justify-between items-center gap-4">
      {children}
    </div>
  )
}

export default InputGroup