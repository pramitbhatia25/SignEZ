import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from "./components/views/Home/home";
import Try from "./components/views/Try/try";
import Error404 from "./components/views/Error404/error404";
import { useState, useEffect } from 'react';
import LogIn from "../src/components/shared/LogIn/login"
import SignUp from "../src/components/shared/SignUp/signup"
import Redeem from './components/views/Redeem/redeem';
import Practice from './components/views/Practice/practice';
import { FIND_API_URL } from './apiConfig';
import Stats from './components/views/Stats/stats';

function App() {
  let [signedIn, setSignedIn] = useState(false)
  let [user, setUser] = useState({name:'', email: '', points: 0, images:[]})



  useEffect(() => {

    async function getUserDetails(a) {
      let response = await fetch(FIND_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          'email': a,
        }),
      })
      if (response.ok) {
        const data = await response.json();
        setUser({name: data.user.name, email: data.user.email, points: data.user.points, images:data.user.images})
      } else {
        console.error('Failed to fetch data');
        alert("Don't mess with cookies!")

        document.cookie = 'email' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "/"
        return null
      }
    }

    const emailCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('email='));

  if (emailCookie) {
    const emailValue = emailCookie.split('=')[1];
    getUserDetails(emailValue);
    setSignedIn(true);
  } else {
    setSignedIn(false);
  }
  }, [signedIn, user.points])


  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);



  const openSignUp = () => {
    if (isLogInOpen) {
      setIsLogInOpen(false);
    }
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  const openLogIn = () => {

    if (isSignUpOpen) {
      setIsSignUpOpen(false);
    }
    setIsLogInOpen(true);
  };

  const closeLogIn = () => {
    setIsLogInOpen(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          <Route path="/try" element={<Try openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
          {signedIn ? 
            <>
            <Route path="/stats" element={<Stats  user={user} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
            <Route path="/practice" element={<Practice  user={user} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
            <Route path="/redeem" element={<Redeem  user={user} openSignUp={openSignUp} closeSignUp={closeSignUp} openLogIn={openLogIn} closeLogIn={closeLogIn} signedIn={signedIn} setSignedIn={setSignedIn} />} />
            </>
            :
            <></>            
          }
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      {isSignUpOpen && (
        <SignUp className="page1_create" signedIn={signedIn} setSignedIn={setSignedIn} closePopup={closeSignUp} />
      )}

      {isLogInOpen && (
        <LogIn className="page2_create" signedIn={signedIn} setSignedIn={setSignedIn} closePopup={closeLogIn} />
      )}

      </div>
  );
}

export default App;
