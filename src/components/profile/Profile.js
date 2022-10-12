import React from 'react';
import './profile.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebaseConfig";

export default function Profile() {
    const [user] = useAuthState(auth);
    var signupDate= user.metadata.creationTime
  
    
console.log(user)
    return (
        <div style={{marginTop: 100}}>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4">
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                        <button className="btn btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                        </button>
                        <span className="name mt-3">{user.displayName}</span>
                        <span className="idd">{user.email}</span>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                            <span className="idd1">{user.uid}</span>
                            <span><i className="fa fa-copy"></i></span>
                        </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                            <span className="number"> <span className="follow"> <p></p></span></span>
                        </div>
                        <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Edit Profile</button>
                        </div>
                      
                                <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span>
                                    <span ><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span>
                                </div> <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {signupDate.substring(5,17)}</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}