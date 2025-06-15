import { useState } from "react";
import { Form, Container, InputGroup } from "react-bootstrap";
import Button from "../global/Button";
import { toast } from "react-toastify";
import FormInput from "../global/FormInput";
import { useNavigate } from "react-router-dom";
import { loginUser, loginGuestUser } from "../../services/authService";
import { showError } from "../../utils/utils";
import { PAGE_URLS } from "../../config/app.config.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const { email, password } = formData;

    //Form Validation
    if (!email || !password) {
      toast.warning("Please fill all the mandatory fields!");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser({ email, password });
      toast.success(data.message);
      localStorage.setItem("userToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate(PAGE_URLS.CHAT);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const data = await loginGuestUser();
      toast.success(data.message);
      localStorage.setItem("userToken", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      navigate(PAGE_URLS.CHAT);
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="mb-2"
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
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button variant="danger" className="w-100" onClick={handleGuestLogin}>
            Login As Guest User
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
