import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from "axios";
import "./login.css";
import CustomButton from "../Custom/customButton/customButton.js";
import CustomInput from "../Custom/customInput/customInput.js";

function Login() {

    let a = false
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [tryAgain, setTryAgain] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successLogin, setSuccessLogin] = useState("")
    const [failedLogin, setFailedLogin] = useState("")
    const navigate = useNavigate();   

    const emailCallback = (value) => {
      setEmail(value);
    }

    const passwordCallback = (value) => {
      setPassword(value);
    }


    const handleSubmit = async e => {
        e.preventDefault();
               // if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
        //     {      
        //       a = true
        //       setEmailError("You have entered an invalid email address!")
        //       setTryAgain(true)
        //     }
        if (!a) {
          if (password.length < 6) {
                a = true
                setPasswordError("The password must be at least 6 character")
                setTryAgain(true)
            }
          }


        // if (!a) {

          

        //   try {
        //     await Axios.post("http://localhost:8000/login", {
        //         email: email,
        //         password: password
        //     })
        //   } catch (error) {
        //     console.log(error)
        //   }
        
        // }

        if (!a) {
        try {
          var result = await Axios.post('https://vr4cxb4qhb.execute-api.us-west-2.amazonaws.com/prod/getusercred',{
            "username": email,
            "password": password
           })
               var res = JSON.stringify(result['data'])
               var final_res = JSON.parse(res)
               var resp = final_res[0]['p_out_mssg_flg']
  
               if ( resp  === 'S') {
                  setSuccessLogin("Successful login!!")
                  setTimeout(navigate('/upload', { replace: true }), 1000);
                   ;
               }
               else {
                   setFailedLogin("User does not exists. Please try again")
                  //  setTimeout(() => window.location.reload(false), 1000);
                   setTryAgain(true)
               }
        } catch (error) {
               console.log(error)
           }
          }
    }
            


return (
  <html>
  <head>
  </head>
  <body>
  <div class="wrapper">
  <div class="container">
    <div class="sign-in-container">
      <form class="form">
        <h1>LOGIN</h1>
        <div class="login_headline">
          <h3 style={{"marginLeft": "25%", "marginBottom": "0"}}>Welcome back.</h3> 
          <h3 style={{"marginTop": "0"}}>Feel free to browse through....</h3>
        </div>
        <div style={{"marginBottom": "3%"}}>
          <CustomInput type="text" placeholder="Email" className="custom_input" name="name" callback={emailCallback}/>
          <p class="error_warning">{emailError}</p>
        </div>
        <div style={{"marginBottom": "3%"}}>
          <CustomInput type="password" placeholder="Password" className="custom_input" name="password" callback={passwordCallback}/>
          <p class="error_warning">{passwordError}</p>
        </div>
        
        <div onClick={handleSubmit}>
          { !tryAgain ?
          <CustomButton className="form_btn" >
            SIGN IN
          </CustomButton>
          : <></> }
        </div>
        {
          successLogin ?
          <h4 style={{"color":"blue", "margin": "0"}}>{successLogin}</h4>
          : <></>
        }
        {
          failedLogin ?
          <h4 style={{"color":"red", "margin": "0"}}>{failedLogin}</h4>
          : <></>
        }
        
        {tryAgain ? 
        <CustomButton className="form_btn">
            TRY AGAIN
          </CustomButton>
         : <></> }
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay-right">
        <h1>REACH TO MILLIONS IN A BLINK.</h1>
      </div>
    </div>
    </div>
    </div>
    </body>
    </html>


    )
}


export default Login