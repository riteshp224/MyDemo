import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/login';
import UserList from './User/userlist';
function App() {

    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const [isAuthenticated, setIsAuthenticated] = useState(storedAuthStatus === 'true');
    const [progress, setProgress] = useState(0);
    const handleLogin = (value) => {
        setIsAuthenticated(value);
        localStorage.setItem('isAuthenticated', value.toString());
        return <Navigate to="/document-list" />;
      };

      useEffect(() => {
        document.body.style.backgroundColor = '#ece8e4';
        return () => {
          document.body.style.backgroundColor = '';
        };
      }, []);

      return (
        <>
          <Router>
            <div className="App">
              {isAuthenticated 
            //   && (
            //     <Sidebar
            //       isAuthenticated={setIsAuthenticated}
            //     />
            //   )
              }
              {/* <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(progress)}
              /> */}
              <Routes>
                {<Route path="/user-list" setProgress={setProgress} element={<UserList />} />
                /* <Route path="/verify-email" setProgress={setProgress} element={<ForgotPassword />} />
                <Route path="/verify-otp" setProgress={setProgress} element={<OTP />} />
                <Route path="/reset-password" setProgress={setProgress} element={<ResetPassword />} />
                <Route path="/reset-success" setProgress={setProgress} element={<ResetPasswordSuccess />} /> */}
                <Route path="/" element={<Login onLogin={handleLogin} />} />
              </Routes>
            </div>
          </Router>
        </>
      );
}

export default App;
