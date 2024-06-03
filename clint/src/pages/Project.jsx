// import react from 'react';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/Card'
import Searchbar from '../components/Searchbar'
const Project =  () => {

    const data=async()=>{
  try {
    const res = await axios.get(
      process.env.REACT_APP_APILINK + "/api/v1/project/find-all"
    );
    if (!res.data.msg) {
      console.log(res.data);
    } else {
      alert(res.data.msg);
      localStorage.removeItem("userInfo");
    }
  } catch (e) {
    console.log(e);
  }}

  data()

  return (
    <>
      <div>
        <div className="col-12 pt-4 pb-3">Project</div>
        <Searchbar />
        <Card />
      </div>
    </>
  );
};

export default Project