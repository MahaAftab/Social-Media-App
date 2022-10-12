import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import HomeIcon from '@mui/icons-material/Home';
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div className="fixed-top border" style={{ backgroundColor: "whitesmoke" ,}}>
      <nav className="navbar" style={{marginLeft: 10, marginRight: 10}}>
        <div>
        <Link className="nav-link" to="/articles">
       <HomeIcon />
       </Link>
        </div>
        <Link className="nav-link" to="/articles">
          Home{" "}
        </Link>
        <div>
          {user && (
            <>
            <AccountMenu />
              {/* <span className="pe-4"> */}
                    {/* User:  {user.displayName || user.email} */}
                    {console.log(user.displayName)}
              {/* </span> */}
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
