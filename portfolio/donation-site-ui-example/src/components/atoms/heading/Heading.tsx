interface Props {
    level: number
    children: string
}

const Heading = ({level, children}: Props) => {
    const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <CustomTag>{children}</CustomTag>
  )
}

export default Heading