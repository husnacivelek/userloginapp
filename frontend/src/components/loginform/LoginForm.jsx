import React, {useState} from "react";

const LoginForm = ({setAuth}) => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formData;

  const handleInputChange = (e) => {
    setFormData((prev) => {
      let helper = {...prev};
      helper[`${e.target.id}`] = e.target.value;
  
      return helper;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {email, password};
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      
      if (parseRes.token) {

        localStorage.setItem("token", parseRes.token);
        setAuth(true);    
      
      } else {
        setAuth(false);      
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
    return (
        <div className="App-wrapper">
          <form action="" onSubmit={handleSubmit}>

            <h1>Login</h1>

            <div className = "input-box">
              <input type = "email" placeholder = "Email" value = {formData.email} id = 'email' onChange={handleInputChange} required/>
            </div>

            <div className = "input-box">
              <input type = "password" placeholder = "Password" value = {formData.password} id = 'password' onChange={handleInputChange} required />
            </div>

            <div className = "remember-forgot">
              <label><input type = "checkbox" />Remember password</label>
            </div>
        
            <button type = "submit" >Login</button>

            <div className = "link" >
              <p>Don't have an account?</p>
              <a href = "/register" >Click me to create account</a>
            </div>  

          </form>

        </div>
    );
  };
export default LoginForm;