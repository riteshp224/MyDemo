
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import { errorMessages, titles, regex, loginLabel } from "../Constant/Constants"
import { FallingLines } from 'react-loader-spinner';
export default function Login(props) {
    localStorage.clear();
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        EmailId: '',
        Password: '',
      });
      const emailRegex = regex.emailRegex;

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        if (name === 'EmailId') {
          setEmailError(null);
        } else if (name === 'Password') {
          setPasswordError(null);
        }
      }
    
     const redirectForgotPassword = async () => {
        navigate('/verify-email');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        if (!formData.EmailId) {
          setEmailError(errorMessages.emailRequired);
        }
        else if (!emailRegex.test(formData.EmailId)) {
          setEmailError(errorMessages.validEmail);
          return;
        }
        else {
          setEmailError(null);
        }
    
        if (!formData.Password) {
          setPasswordError(errorMessages.passwordRequired);
        } else {
          setPasswordError(null);
        }
    
        if (!formData.EmailId || !formData.Password) {
          return;
        }

        let data = {
            emailId: formData.EmailId,
            password: formData.Password,
            adminRoleId: 1,
          };

        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}admin/account/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.json();
          if (responseData.success) {
            localStorage.setItem('authToken', responseData.data.jwtToken);
            props.onLogin(true);
            toast.success(responseData.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
            navigate('/user-list');
          } else {
            toast.error(responseData.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
          }
          setLoading(false);
        } catch (error) {
          console.error('Error during login:', error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
   
   
   
    return (
        <>
        <ToastContainer />
        <div className="login_main">
            <div className="login_inner">
                <div className="top_sec">
                    <img className="img-fluid login-logo" src="../../assets/images/logo512.png" alt="logo" />
                    <h2 className="login_title">{titles.welcome}</h2>
                    <p className="desc_text">{titles.title}</p>
                </div>
                <div className="inner_form">
                    <form>
                        <div className="mb-4 position-relative">
                            <label className="form-label float-start">{loginLabel.emailAddress} <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    id="typeEmailX"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={formData.EmailId}
                                    name="EmailId"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {emailError && <span className="text-danger float-start">{emailError}</span>}
                        </div>
                        <div className="mb-4 position-relative">
                            <label className="form-label float-start mt-2">{loginLabel.password} <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="typePasswordX"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={formData.Password}
                                    name="Password"
                                    placeholder="Enter password"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="icon-eye"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                </div>
                            </div>
                            {passwordError && <span className="text-danger float-start">{passwordError}</span>}
                        </div>
                        <div className="mt-3 d-flex flex-wrap justify-content-end gap-3">
                            <a className='forgot-text' onClick={redirectForgotPassword}>{loginLabel.forgotPassword}</a>
                        </div>
                        <button
                            className="login_btn mt-3"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <FallingLines
                                    color="#fff"
                                    width="30"
                                    visible={true}
                                    ariaLabel="falling-circles-loading"
                                />
                            ) : (
                                loginLabel.logIn
                            )}
                        </button>
                    </form >
                </div >
            </div >
        </div >
        </>
    );
}