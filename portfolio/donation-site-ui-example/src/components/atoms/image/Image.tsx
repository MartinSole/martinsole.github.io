interface Props {
    alt?: string
    src: string
}

const Image = ({alt = '', src}: Props) => {
  return (
    <img src={src} alt={alt} />
  )
}

export default Image