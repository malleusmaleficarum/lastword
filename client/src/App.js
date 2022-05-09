import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound404 from "./pages/NotFound404";
import Letters from "./pages/Letters";
import SingleLetter from "./pages/SingleLetter";
import Write from "./pages/Write";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./pages/About";

function App() {
  const user = useSelector((state) => state.auth.user);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to='/login' />;
  };

  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
      <Route path='/letters' element={<Letters />} />
      <Route path='/letter/:letterid' element={<SingleLetter />} />
      <Route
        path='/register'
        element={user ? <Navigate to='/' /> : <Register />}
      />
      <Route
        path='/write'
        element={
          <RequireAuth>
            <Write />
          </RequireAuth>
        }
      />
      <Route path='/user/:id/verify/:token' element={<EmailVerify />} />
      <Route path='/forgotPassword' element={<ResetPassword />} />
      <Route path='/resetPassword/' element={<ChangePassword />} />
      <Route path='/profile/:userid' element={<Profile />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
