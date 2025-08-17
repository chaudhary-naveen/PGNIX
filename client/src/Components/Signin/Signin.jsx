import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Chip } from "@mui/material";
import path from "../../path";
import axios from "axios";
import { addUser , setToken } from "../../utils/slices/userSlice";
import { useDispatch } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("male");
  const [load, setload] = useState(false);
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;


  const validate = () => {
    if (!emailRegex.test(email) && email.length > 0) {
      setError("Enter a Valid Email");
      return false;
    }
    if (!passwordRegex.test(password) && password.length > 0) {
      console.log(password);
      setError("Enter password with a capital letter,small,Number and symbol");
      return false;
    }
    if (password != confirm) {
      setError("Password didnt match with confirm");
      return false;
    }
    setError("");
    return true;
  };


  const handleSubmitOtp = (e) => {
    if (e.target.value == '') {
      setOtp('');
    }
    if (e.target.value.length <= 6 && e.target.value.slice(-1) >= '0' && e.target.value.slice(-1) <= '9') {
      setOtp(e.target.value);
    }
  };

  const handleSubmitSignin = async () => {
    if (otp.length < 6) {
      toast.error("OTP should be 6 digit");
      return;
    }
    setload(true);
    try {

      const response = await axios.post(`${path}/api/create`, {
        email,
        otp,
        password,
        firstname,
        gender,
        lastname,
        dob,
        phone
      });


      if (response.data.success) {
        dispatch(addUser(response.data.user));
        dispatch(setToken(response.data.token));
        navigate('../');
        setError("");
      }
      else {
        toast.error(response.data.message);
        setError(response.data.message)
      }
    }
    catch (err) {
      console.log(error);
    }
    setload(false);
  };


  const submitHandler = async () => {
    try {
      setload(true);
      const res = await axios.get(`${path}/api/exist`, {
        params: { email }
      });
      console.log(res);
      if (res.data.exists == false) {
        setActiveStep(2);
      } else if (res.status == 404) {
        toast.error("Owner with this email already exist");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
    setload(false);
  };

  return (
    <div className="signin">
      {load && <LinearProgress></LinearProgress>}
      <ToastContainer></ToastContainer>

      <div className="stepper">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>



      <div className="signin-button">
        <Button
          sx={{ color: "black" }}
          disabled={activeStep == 0}
          startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
      </div>

      <div className="signin-body">
        {activeStep == 0 ? (
          <>
            {/* First Paenel */}
            <div className="login-box">
              <div className="login-box-title">Welcome</div>

              <div className="login-box-field">
                <p>Choose your role</p>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={"user"}>To search Properties</option>
                  <option value={"owner"}>To manage Properties</option>
                </select>
              </div>

              <div className="login-box-field">
                <p>Email</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>

              <div className="login-box-field">
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>

              <div className="login-box-field">
                <p>Verify Password</p>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>

              <div className="login-box-error">{error}</div>
              <div className="login-box-link">Have a Account ? Login <Link to='/login'>here</Link></div>
            </div>
          </>
        ) : // second panel
          activeStep == 1 ? (
            <>
              <div className="login-box">
                <div className="login-box-title">Tell us more</div>
                <div className="login-box-field">
                  <p>First Name</p>
                  <input
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    placeholder=""
                  ></input>
                </div>
                <div className="login-box-field">
                  <p>Last name</p>
                  <input
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  ></input>
                </div>
                <div className="login-box-field">
                  <p>Phone Number</p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>
                <div className="login-box-field">
                  <p>Date of Birth</p>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setdob(e.target.value)}
                  ></input>
                </div>
                <div className="login-box-field">
                  <p>Gender</p>
                  <select
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"other"}>Other</option>
                  </select>
                </div>

                <div className="login-box-error">{error}</div>
              </div>
              <div className="login-side-display"></div>
            </>
          ) :
            activeStep == 2 ? <div className="otp">
              <div>OTP Verification</div>
              <p>Enter otp sent to {email}</p>
              <div className="otp-inbox">
                <input onChange={handleSubmitOtp} value={otp} type="text"></input>
              </div>
              <div className="login-box-error" style={{ fontSize: "12px" }}>{error}</div>
              <Button variant="contained" fullWidth onClick={handleSubmitSignin} disabled={load}>Verify</Button>
            </div> : ""
        }




      </div>
      <div
        className="signin-button"
        style={{ justifyContent: "center", paddingBottom: "20px" }}
      >
        {activeStep == 1 ? (
          <Button variant="contained" onClick={submitHandler} disabled={load}>
            Submit
          </Button>
        ) : ""}
        {
          activeStep < 1 ? <Button
            variant="outlined"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button> : ""
        }
      </div>

    </div>
  );
};

export default Signin;
