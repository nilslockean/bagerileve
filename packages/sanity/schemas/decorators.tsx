import React from 'react'

type ButtonProps = {
  primary?: boolean
  children?: React.ReactNode
}

function _getStyles(props: ButtonProps): React.CSSProperties {
  return {
    fontWeight: 'bold',
    background: props.primary ? '#1E3A8A' : '#FFF7ED',
    color: props.primary ? '#FFF7ED' : '#1E3A8A',
    padding: '4px 8px',
  }
}

export const ButtonIcon = (props: ButtonProps) => {
  return <Button {...props} />
}

export const Button = (props: ButtonProps) => {
  return <span style={_getStyles(props)}>{props.children}</span>
}
