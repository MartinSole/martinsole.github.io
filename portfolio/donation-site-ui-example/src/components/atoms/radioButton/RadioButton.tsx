import React, { Fragment } from 'react'

interface Props {
  handleOnChange?: React.ChangeEventHandler
  id: string
  index: number
  name: string
  text: string
}

const RadioButton = ({ id, index, name, text,handleOnChange }: Props) => {
  return (
    <Fragment>
      <input id={id} name={name} value={text} type="radio" onChange={handleOnChange} defaultChecked={index === 0}/>
      <label htmlFor={id} className='buttonBase'>
        {text}
      </label>
    </Fragment>
  )
}

export default RadioButton