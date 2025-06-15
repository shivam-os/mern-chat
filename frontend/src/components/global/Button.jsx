import { Button as RButton } from "react-bootstrap";

const Button = ({
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  children,
  size,
  className = "",
  ...props
}) => {
  return (
    <RButton
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      size={size}
      className={className}
      {...[props]}
    >
      {children}
    </RButton>
  );
};

export default Button;
