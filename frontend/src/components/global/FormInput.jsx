import { Form } from "react-bootstrap";

const FormInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  name,
  error,
  disabled = false,
  ...props
}) => {
  return (
    <Form.Group className="w-100">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={!!error}
        disabled={disabled}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
