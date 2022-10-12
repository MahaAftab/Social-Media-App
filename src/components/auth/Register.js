import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState();
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      console.log(auth.currentUser)
      setLoading(false)
      navigate("/articles");
      window.location.reload()
    } catch (error) {
      setLoading(false)
      toast(error.code, { type: "error" });
    }
  };
  return (
    <>
      {loading ? <LoadingSpinner res="Sigining up..."/> :
      <div className="border p-5 bg-light container-sm" style={{ marginTop: 100, maxWidth: 500 }}>
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={handleSignup}>
            Register
          </button>
        </div>

        <div style={{ textAlign: 'center' }}> Already have an account?
          <Link to="/signin">Sign in  </Link>
        </div>

      </div>
    }

    </>
  );
}