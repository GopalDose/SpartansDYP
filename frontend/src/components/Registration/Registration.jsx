import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    navigate('/dashboard');
  }
  return (
    <>
      <div className="content">
        <form className="form">
          <div className="flex-column">
            <h2 className='card-title'>{isLogin ? 'Login' : 'Register User'}</h2>
          </div>
          {!isLogin && (
            <>
              <div className="flex-column">
                <label>Name </label>
              </div>
              <div className="inputForm">
                <svg height={60} viewBox="0 -9 32 32" width={40} xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_3" data-name="Layer 3">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                  </g>
                </svg>
                <input type="text" className="input" placeholder="Enter your Name" disabled={isLogin} />
              </div>
            </>
          )}
          <div className="flex-column">
            <label>Mobile No: </label>
          </div>
          <div className="inputForm">
            <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H7zm5 19c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zM16 15H8V4h8v11z" />
            </svg>

            <input type="number" className="input" placeholder="Enter your Mobile No" />
          </div>
          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
            </svg>
            <input type="password" className="input" placeholder="Enter your Password" />
          </div>
          <button onClick={handleSubmit} className="button-submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          <p className="p">{isLogin ? "Don't have an account? " : "Already have an account? "}<span className="span" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</span></p>
        </form>
      </div>
    </>
  );
}

export default Registration;