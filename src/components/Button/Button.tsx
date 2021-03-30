import React, { useState } from 'react'

type ButtonProps = {
  name: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {

  const [submitButtonHover, setSubmitButtonHover] = useState(false)
  const [submitButtonFocusState, setSubmitButtonFocusState] = useState(false)

  const submitButtonStyle: React.CSSProperties = {
    alignItems: 'center',
    backgroundColor: submitButtonHover ? '#34D399' : '#10B981',
    borderRadius: '0.375rem',
    color: '#ffffff',
    display: 'flex',
    height: '3rem',
    justifyContent: 'center',
    outline: submitButtonFocusState ? '2px solid transparent' : '',
    outlineOffset: submitButtonFocusState ? '2px' : '',
    transitionProperty: 'background-color, border-color, color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    width: '100%',
  }

  return (
    <button
      type="submit"
      onClick={props.onClick}
      onMouseEnter={() => setSubmitButtonHover(!submitButtonHover)}
      onMouseLeave={() => setSubmitButtonHover(!submitButtonHover)}
      onFocus={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      onBlur={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      disabled={props.disabled}
      style={submitButtonStyle}>
      {props.name}
    </button>
  )
}

export default Button