import '../scss/Nav/index.scss'
import { Link } from "react-router-dom";
import    { useHistory}    from 'react-router-dom';

const Nav = ({page}) => {
  const history = useHistory();

const logout=()=>{
           localStorage.removeItem("userInfo");
       history.push('/')
}

const clickdesk=(name)=>{
page(name)
}

  return (
    <>
      <div className="navbarcss">
        <Link to="/home" className="navlink">
          <div>
            <img
              src="/image/homepage/logo.svg"
              alt="icon"
              className="imageIcon mt-2"
            />
          </div>
        </Link>

        <div>
          <img
            src="/image/homepage/layers.svg"
            alt="icon"
            className="imageIcon mt-3"
            onClick={() =>clickdesk('project')}
          />
        </div>
        <div>
          <img
            src="/image/homepage/member.svg"
            alt="icon"
            className="imageIcon"
            onClick={() =>clickdesk('member')}

          />
        </div>
        <div>
          <img
            src="/image/homepage/ballot.svg"
            alt="icon"
            className="imageIcon"
            onClick={() =>clickdesk('task')}

          />
        </div>
        <div>
          <img
            src="/image/homepage/setting.svg"
            alt="icon"
            className="imageIcon"
            onClick={() =>clickdesk('setting')}
          />
        </div>

        <div className="imageIcon2" >
          <img
            src="/image/homepage/log-out.svg"
            alt="icon"
            className="imageIcon"
            onClick={() =>logout()}
          />
        </div>
      </div>
    </>
  );
};
export default Nav;
