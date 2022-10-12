import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from "../loading/LoadingSpinner";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState()

  const handleLogin = async () => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      navigate("/articles");
    } catch (error) {
      toast(error.code, { type: "error" });
      setLoading(false)

    }
  };
  return (
    <>
    {/* <img src="../pictures/login" /> */}
   {
    loading? <LoadingSpinner res="Sigining in..."/> : <div className="border p-3 bg-light mx-auto"
    style={{maxWidth:400, marginTop:100}}
    >
      <h1 style={{textAlign: 'center'}}>Login</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <div style={{textAlign:'center'}}>
      <button className="btn btn-primary" onClick={handleLogin} >
        Login
      </button>
      </div>
   
<div style={{textAlign:'center'}}>
<span>Don't have an account? <Link to='/register'>Register Now!</Link></span>

</div>
    </div>
   } 
    </>
  );
}
