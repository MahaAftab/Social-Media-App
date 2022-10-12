import { getAuth, onAuthStateChanged } from "firebase/auth";
import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";
import Profile from "./components/profile/Profile";
import WelcomePage from "./components/WelcomePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import Protected from "./components/routes/Protected";
import { useState } from "react";
import Page404 from "./components/page404";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
      const uid = user.uid;
    } else {
      setIsAuthenticated(false);
    }
  });
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/profile'
            element={
              <Protected isLoggedIn={isAuthenticated}>
                <Profile />
              </Protected>
            }
          />
          <Route path='/register'
            element={
              <Protected isLoggedIn={!isAuthenticated}>
                {console.log("REGISTER :", isAuthenticated)}
                <Register />
              </Protected>
            }
          />
          <Route path='/signin'
            element={
              <Protected isLoggedIn={!isAuthenticated}>
                <Login />
              </Protected>
            }
          />
          <Route path="/*" element={<Page404 />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/"
            element={
              <WelcomePage />
            }
          />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
