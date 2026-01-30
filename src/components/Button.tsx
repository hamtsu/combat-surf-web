import React, { Children, FC } from 'react'

type ButtonProps = {
    className: string,
    children: React.ReactNode,
    onClick?: () => void,
    style ?: React.CSSProperties,
}

const Button: FC<ButtonProps> = ({ className, children, onClick, style }) => {
  return (
    <button style={style} onClick={onClick} className={"rounded-md flex items-center gap-1 select-none hover:cursor-pointer " + className}>
        {children}
    </button>
  )
}

export default Button