import { Route, Routes } from "react-router-dom";
// import NavBar from "./components/common/navbar";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/auth/loginPage";
import SignUpPage from "./pages/auth/signupPage";
import SideBar from "./components/common/sideBar";
import RightPanel from "./components/common/rightBar";
import NotificationPage from "./pages/notification/Notification";
import ProfilePage from "./pages/profile/profilePage";

function App () {
  return <>
  <div className='flex max-w-6xl mx-auto'>
  <SideBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/notifications' element={<NotificationPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
  <RightPanel/>
  </div>
  </>
}

export default App;