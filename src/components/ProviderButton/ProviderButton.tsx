import React from 'react'

type ProviderButtonPropType = {
  name: string,
  src: string,
}

const ProviderButton: React.FC<ProviderButtonPropType> = ({ name, src }) => {
  // console.count(`${name} provider render`)
  const providersButtons: React.CSSProperties = {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E4E4E7',
    color: '#71717A',
    display: 'flex',
    flexDirection: 'row',
    height: '3rem',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '0.375rem',
    transitionProperty: 'background-color, border-color, color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    width: '100%',
  }

  return (
    <button
      style={providersButtons}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement
        target.style.backgroundColor = "#FAFAFA"
        target.style.borderColor = "#D4D4D8"
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement
        target.style.backgroundColor = "#FFFFFF"
        target.style.borderColor = "#E4E4E7"
      }}
    >
      <img
        style={{ paddingRight: '0.5rem' }}
        alt={name}
        src={src} />
      <span>{name}</span>
    </button>
  )
}

export default ProviderButton