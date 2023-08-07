import React from "react";

import "./button.css";

const Button = (props) => {
  const {
    btnText,
    primary,
    secondary,
    size,
    radius,
    bgColor,
    textColor,
    width,
    icon,
    btnClick,
  } = props;

  const buttonStyle = {
    backgroundColor:
      bgColor || (primary ? "#EC1F3E" : secondary ? "#6c757d" : "transparent"),
    color: textColor || "#ffffff",
    borderRadius: radius || "40px",
    fontSize: size || "16px",
    width: width || "auto",
  };

  return (
    <button className="btn" style={buttonStyle} onClick={btnClick}>
      {icon}
      {btnText}
    </button>
  );
};

export default Button;
