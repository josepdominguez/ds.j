import React from 'react';

const Button = ({ label, ...otherProps }) => {
    return React.createElement("button", { ...otherProps }, label);
};

export { Button as default };
//# sourceMappingURL=Button.js.map
