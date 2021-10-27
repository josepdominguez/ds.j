import React from 'react'

interface ButtonProps {
    label: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ label }) => {
    return <button>{label}Heldddlo test</button>
}

export default Button