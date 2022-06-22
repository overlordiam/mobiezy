import Login from "./components/login/login";
import Register from "./components/signUp/signUp"
import Home from "./components/home/home"
import Upload from "./components/Upload/upload"
import Test from "./components/Upload/test"
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-up" element={<Register />} />  
            <Route exact path="/login" element={<Login />} />  
            <Route exact path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
