import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // ✅ RESET FORM FUNCTION
  const resetForm = () => {
    setFormData({ email: "", password: "" });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // ✅ RESET ON MODAL CLOSE
  useEffect(() => {
    const modal = document.getElementById('loginModal');
    modal.addEventListener('hidden.bs.modal', resetForm);
    return () => {
      modal.removeEventListener('hidden.bs.modal', resetForm);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required!";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          newErrors.email = "Enter a valid email address!";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value.trim()) {
          newErrors.password = "Password is required!";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters!";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = "Password must have one uppercase letter!";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "Password must have one number!";
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateAll = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address!";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must have one uppercase letter!";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must have one number!";
    }
    return newErrors;
  };

  const handleLogin = async () => {
    setTouched({ email: true, password: true });
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
          setIsSubmitting(true);
          console.log("Calling API...", formData);

          let loginResponse = await axios.post("http://localhost:8080/auth/login", formData);
          setIsSubmitting(false);

          if (loginResponse.data.success) {
            localStorage.setItem("userData", JSON.stringify(loginResponse.data.data));
            localStorage.setItem("token", loginResponse.data.data.token);
            window.location.href = "/home";
          }
        } catch (err){
            setIsSubmitting(false);
            console.error("Login failed", err);
            setErrors({ api: err.response?.data?.message || "Login failed" }); // ✅ Fixed
          }
  };


  
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "380px" }}>
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title fw-bold">🍔 Login</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={resetForm}
            ></button>
          </div>

          <div className="modal-body p-4">

            {errors.api &&
              <div className="alert alert-danger py-2">{errors.api}</div>
            }

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className={`form-control ${touched.email && errors.email ? "is-invalid" : touched.email && !errors.email ? "is-valid" : ""}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email &&
                <div className="invalid-feedback">{errors.email}</div>
              }
              {touched.email && !errors.email && formData.email &&
                <div className="valid-feedback">Looks good! ✅</div>
              }
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : touched.password && !errors.password ? "is-valid" : ""}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password &&
                <div className="invalid-feedback">{errors.password}</div>
              }
              {touched.password && !errors.password && formData.password &&
                <div className="valid-feedback">Looks good! ✅</div>
              }
            </div>

            <button
              className="btn btn-dark w-100 mb-3"
              onClick={handleLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login 🚀"}
            </button>

            <div className="text-center mt-2">
              <p className="mb-2">Don't have an account?</p>
              <button
                className="btn btn-success w-100"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                Sign Up ✨
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
