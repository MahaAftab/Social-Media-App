import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { Button } from '@mui/material'

function WelcomePage() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate('/')
    
        } catch {
          alert("Error!");
        }
      }
    console.log('welcome page')
    return (
        <>
        {
            !user ?(
        <div style = {{ textAlign: "center", paddingLeft: 100, paddingTop: 200}} >
        <>
            <h2>
                <Link to='/articles'><h1 style={{textDecoration: 'none', color: 'black'}}>Take a look at the posts</h1></Link>
                
                <Link to="/signin">Login to Post</Link>
            </h2>
            Don't have an account? <Link to="/register">Signup</Link>
        </>
   </div >
   ) : (
    <div  style = {{ margin:'20%', textAlign:'center'}}  >
        <Link to='/articles'><h2>YOU ARE STILL LOGGED IN - GO TO HOME PAGE</h2></Link>
        <p><h2>or</h2></p>
        <Button variant= 'contained' style={{fontSize:'large'}}onClick={handleLogout}>Logout</Button>
    </div>
    )
}
</>
  )
}

export default WelcomePage
