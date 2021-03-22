import React, { useState, useEffect } from 'react'

type Props = {
  type: "email" | "password" | "text",
  placeholder?: string,
  name?: string,
  autocomplete?: "email" | "password" | "on" | "off",
  required?: boolean,
  // ref: React.Ref<HTMLInputElement>
  // isValid?: boolean,
  // onChange?: () => void
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {

  // state of the input validity; false = valid
  const [invalidInput, setInvalidInput] = useState<boolean>(false)

  // state to track if the field is active
  const [fieldActive, setFieldActive] = useState<boolean>(false)

  // This method handles the state changes / validity checking when the input is changed
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // if (props.onChange) {
    //     props.onChange()
    // }
    // const invalid = props.isValid ? true : !event.target.validity.valid
    // setInvalidInput(invalid)
    setInvalidInput(!event.target.validity.valid)
  }

  // This method handles the state change when the input is focued
  const handleOnFocus: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFieldActive(true)
  }

  // This method handles the state change when the input is unfocused 
  const handleOnBlur: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFieldActive(Boolean(event.target.value.length))
  }

  const wrapperStyle: React.CSSProperties = {
    marginBottom: '1rem',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  }

  const inputStyle: React.CSSProperties = {
    border: '1px solid',
    borderColor: invalidInput ? '#F87171' : '#E4E4E7',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    height: '3.5rem',
    outline: '2px solid transparent',
    outlineOffset: '2px',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '1rem',
    width: '100%',
  }

  const placeholderStyle: React.CSSProperties = {
    color: invalidInput ?
      ('#F87171') : (fieldActive ? '#A1A1AA' : '#D4D4D8'),
    fontSize: fieldActive ? '0.75rem' : 'inherit',
    left: '0.75rem',
    lineHeight: fieldActive ? '1rem' : 'inherit',
    pointerEvents: 'none',
    position: 'absolute',
    top: fieldActive ? '0.5rem' : '1rem',
    transitionDuration: '150ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const tagStyle: React.CSSProperties = {
    color: invalidInput ?
      ('#F87171') : (fieldActive ? '#A1A1AA' : '#D4D4D8'),
    fontSize: '0.75rem',
    lineHeight: '1rem',
    pointerEvents: 'none',
    position: 'absolute',
    right: '0.75rem',
    top: '0.5rem',
    userSelect: 'none',
  }

  return (
    <div style={wrapperStyle}>
      <input
        name={props.name ? props.name : ''}
        type={props.type}
        autoComplete={props.autocomplete}
        style={inputStyle}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        ref={ref}
      />
      {props.placeholder ?
        <div
          style={placeholderStyle}>
          {props.placeholder}
        </div> : ''}
      {props.required ?
        <div
          style={tagStyle}>
          {invalidInput ? 'Invalid' : 'Required'}
        </div> : ''}
    </div>
  )
})

export default Input
