// import react from 'react';
import '../scss/Login/index.scss';

const Signup=()=>{return (
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
              type="text"
              className="form-control inputField"
              id="UserName"
              aria-describedby="emailHelp"
              placeholder="User Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control inputField"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <select id="disabledSelect" className="form-select inputField" required>
              <option default>Role</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control inputField"
              id="exampleInputPassword1"
              placeholder="Key"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control inputField"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>

          <button className="loginbtn">SIGN UP</button>
        </form>
      </div>
    </div>
  </>
);}

export default Signup