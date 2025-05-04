import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/auth/loginPage";
import SignUpPage from "./pages/auth/signupPage";

function App () {
  return <>
  <NavBar/>
  <div className='flex max-w-6xl mx-auto' >
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<SignUpPage/>}/>
    <Route path='/' element={<HomePage/>}/>
  </Routes>
  </div>
  </>
}

export default App;