import  {useEffect,useState}from 'react';
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav"
import {  useDispatch } from 'react-redux'
import {setuser} from '../store/reducers/reducers.js'
import Project from './Project'
import '../scss/Dashboard/ds.scss';

const Dashboard=()=>{
    
  useEffect(() => {
    const locstg = localStorage.getItem("userInfo");
    if (!locstg) {
      history.push("/login");
    }
  });
  const history = useHistory();
  const dispatch =useDispatch()
    const userinfo= JSON.parse(localStorage.getItem('userInfo'));

       let user = {
         token: userinfo.token,
         email: userinfo.user.email,
         firstName: userinfo.user.firstName,
         id: userinfo.user.id,
         lastName: userinfo.user.lastName,
         parents: userinfo.user.parents,
         role: userinfo.user.role,
         slackId: userinfo.user.slackId,
         userName: userinfo.user.userName,
         bio: userinfo.user.bio,
       };
       dispatch(setuser(user))

  const [pages,setpage]=useState('project');




   

  return (
    <>
      <Nav page={data=>setpage(data)}/>
      <div className="dashboardpage">
      {pages==='project'&&<Project/>}
      </div>
    </>
  );
}

export default Dashboard