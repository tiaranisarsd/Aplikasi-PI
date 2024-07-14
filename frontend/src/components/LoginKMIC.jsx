import logo from "../logo_katar.png";
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";
import '../style.css';
import { IoMail, IoLockClosed} from "react-icons/io5";


const LoginKMIC = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() =>{
        if(user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) =>{
    e.preventDefault();
    dispatch(LoginUser({email, password}));
    };

  return (
    <section style={{ backgroundColor: hslValue }} className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered ">
            <div className="column is-5">
                <form onSubmit={Auth} className='box has-shadow border justify-content-center'>
                <img 
              src={logo}
              width="25%"
              height="30%"
              alt='logo'
              />
                <h1 style={{ color: hslValue }} className="title is-3 has-text-centered">Sign In</h1>
                <div className="field">
                    <label style={{ color: hslValue }} className="label"><IoMail style={{paddingRight:"1%"}} />Email</label>
                    <div className="control">
                        <input type="text" className="input" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder='e.g. tiaranisars@gmail.com' />
                    </div>
                </div>
                <div className="field">
                    <label style={{ color: hslValue }} className="label"><IoLockClosed style={{paddingRight:"1%"}} />Password</label>
                    <div className="control">
                        <input 
                        type="password" 
                        className="input" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder='******' />
                        {isError && <p className=" message is-danger">{message}</p>}
                    </div>
                </div>
                <div className="field mt-5">
                    <button 
                    type="submit" 
                    style={{ color: hslValue }}
                    className="button is-link is-light is-normal is-fullwidth">
                        {isLoading ? "Loading..." : "Login"}
                        </button>
                    </div>
            </form>
        </div>
    </div>
</div>
</div>
    </section>
  );
};

export default LoginKMIC;