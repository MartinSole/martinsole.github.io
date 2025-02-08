interface Props {
    as?: string
    children: string
}

const Text = ({as = "p", children}: Props) => {
    const CustomTag = `${as}` as keyof JSX.IntrinsicElements;
  return (
    <CustomTag>{children}</CustomTag>
  )
}

export default Text