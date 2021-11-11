import React from 'react'

interface ButtonProps {
    label: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ label, ...otherProps }) => {
    return <button { ...otherProps }>{label}</button>
}

export default Button