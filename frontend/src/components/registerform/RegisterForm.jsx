import React, {useState} from "react";

const RegisterForm = ({setAuth}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const {name, email, password} = formData;

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

      const body = {name, email, password};
      const response = await fetch("http://localhost:5000/auth/register", 
      {method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(body)
    
      });

      const parseRes = await response.json();
      
      if (parseRes.token) {

        localStorage.setItem("token", parseRes.token);
        setAuth(true);

      }else{

        setAuth(false);
        
      }  

    } catch (error) {
      console.error(error.message);
    }
  };

    return (
        <div className="App-wrapper">

          <form onSubmit = {handleSubmit} >

            <h1>Register</h1>

              <div className = "input-box">
                <input type = "text" placeholder = "Name" 
                value = {formData.name} id = 'name' onChange={handleInputChange} required/>
              </div>
            
              <div className = "input-box">
                <input type = "email" placeholder = "Email" 
                value = {formData.email} id = 'email' onChange={handleInputChange} required/>
              </div>

              <div className = "input-box">
                <input type = "password" placeholder = "Password" 
                value = {formData.password} id = 'password' onChange={handleInputChange} required/>
              </div>
              
              <button type = "submit">Register</button>

              <div className = "link">
                <p>Already have an account?</p>
                <a href = "/login" >Click me to login</a>
              </div>

          </form>
          
        </div>
    );
};
export default RegisterForm;