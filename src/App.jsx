import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  Login, Register , Dashboard, NotFound} from "../pages/index";
import Todoinput from "../components/todo/todoinput";

export default function App() {
  const user= localStorage.getItem("token")
  return (
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={ <Login/>}/>
      <Route path="/login" element={ <Login/>}/>
      <Route path="/register" element={<Register/> }/>
      <Route path="*" element={<NotFound/> }/>
     {user &&  <Route path="/dashboard" element={<Dashboard/> } />}
     <Route path="/edittask/:id" element={<Todoinput /> }/>

      
    </Routes>
    
    </BrowserRouter>
  );
}
