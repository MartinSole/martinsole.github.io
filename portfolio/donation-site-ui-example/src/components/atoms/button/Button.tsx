interface Props {
  children: string
  buttonType?: "submit" | "reset" | "button" | undefined
}

const Button = ({buttonType = undefined, children}: Props) => {
  return (
    <button className='buttonBase' type={buttonType}>{children}</button>
  )
}

export default Button