import { useState } from "react";
import { Form, Container, InputGroup } from "react-bootstrap";
import Button from "../global/Button";
import { toast } from "react-toastify";
import FormInput from "../global/FormInput";
import { signupUser } from "../../services/authService";
import { showError } from "../../utils/utils";

const formInitialState = {
  name: "",
  email: "",
  password: "",
  show: false,
};

const Signup = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState(formInitialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setFormData((prev) => ({ ...prev, show: !prev.show }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, name } = formData;

    //Form Validation
    if (!email || !password || !name) {
      toast.warning("Please fill all the mandatory fields!");
      setLoading(false);
      return;
    }

    try {
      const data = await signupUser({ email, password, name });
      toast.success(data.message);
      onSignupSuccess();
      setFormData(formInitialState);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <Form onSubmit={submitHandler}>
          <FormInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />

          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Control
                type={formData.show ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <InputGroup.Text
                onClick={toggleShowPassword}
                style={{ cursor: "pointer" }}
              >
                {formData.show ? "Hide" : "Show"}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 mb-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Signup"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
