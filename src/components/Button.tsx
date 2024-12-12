import React, { Children, FC } from 'react'

type ButtonProps = {
    className: string,
    children: React.ReactNode
}

const Button: FC<ButtonProps> = ({ className, children }) => {
  return (
    <button className={"rounded-md flex items-center gap-1 " + className}>
        {children}
    </button>
  )
}

export default Button