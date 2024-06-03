import  {useState} from 'react';
import axios from 'axios';
import '../scss/Login/index.scss';
import    { useHistory}    from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {setuser} from '../store/reducers/reducers.js'
const Login=()=>{

const dispatch =useDispatch()
  const history = useHistory();
   const [getData, setgetData] = useState({
     email: "",
     password: "",
   });

   const fordata =(e)=>{
     setgetData((data) => {
       return { ...data, [e.target.name]: e.target.value };
     });
   }

   const SubmitData=async(e)=>{
     e.preventDefault();
     const res= await axios.post(process.env.REACT_APP_APILINK+'/api/v1/user/login',getData)
     if(!res.data.msg){
       localStorage.setItem('userInfo', JSON.stringify(res.data));
       let user = {
         token: res.data.token,
         email: res.data.user.email,
         firstName: res.data.user.firstName,
         id: res.data.user.id,
         lastName: res.data.user.lastName,
         parents: res.data.user.parents,
         role: res.data.user.role,
         slackId: res.data.user.slackId,
         userName: res.data.user.userName,
         bio: res.data.user.bio,
       };
       dispatch(setuser( user))
       history.push('/dashboard')
     }
     else{
       alert(res.data.msg)
       localStorage.removeItem("userInfo");
     }
   }

  
  return (
  <>
    <div className="loginpage">
      <div className="loginpage-img">
        <img
          src="/image/homepage/signup.svg"
          alt="sda"
          className="loginpage-img-logo"
        />
      </div>
      <div className="loginpage-section">
        <form className="loginpage-section-mainform">
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control inputField"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              name='email'
              value={getData.email}
                onChange={(e)=>fordata(e)}
              required
            />
          
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control inputField"
              id="exampleInputPassword1"
              placeholder="Password"
                name='password'
              value={getData.password}
              onChange={(e)=>fordata(e)}
              required
            />
          </div>
          <button className="loginbtn" onClick={(e)=>SubmitData(e)}>
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  </>
);}

export default Login