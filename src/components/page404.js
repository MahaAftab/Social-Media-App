import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
      <h1>ERROR 404 - NOT FOUND </h1>
      <br />
      <Link to='/articles'><h2>Return to Home Page</h2></Link>
    </div>
  )
}

export default Page404
