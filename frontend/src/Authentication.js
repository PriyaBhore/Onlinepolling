import React, { useEffect, useState } from 'react';
import './css/authentication.css'; 
import { useNavigate } from 'react-router-dom';

export const Checklogin =(res)=>{
  const navigate = useNavigate();

  if(res.status==401){
    alert('Please login before performing this action');
    navigate('/')
  }
}

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Role-based navigation
        if (data.user.usertype === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed');
    }
  };
  
  

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   // Simple signup logic for now
  //   if (email === '' || password === '') {
  //     setError('Please enter both email and password');
  //   } else {
  //     setError(null);
  //     console.log('Signing up with:', { email, password });
  //     // Handle signup logic here
  //   }
  // };

  useEffect(()=>{
    setError('');
    setEmail('');
    setPassword('')
  },[isLogin])

  

  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (email === '' || password === '') {
      setError('Please enter both email and password');
      return;
    }
  
    try {
      // Sending POST request to register endpoint
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies with request if needed
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful registration
        alert('User registered successfully');
        // Optionally redirect to login page or dashboard
        navigate('/login');
      } else {
        // Handle errors
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };
  
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <h1>Welcome to the Application</h1>
        <div className="col-12 col-md-4">
          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            <div>
              <h2 className="text-center form-title">
                <u>{isLogin ? 'Login' : 'Signup'}</u>
              </h2>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="inputBox mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="inputBox mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="d-grid justify-content-center">
              <button type="submit" className="btn btn-primary">
                {isLogin ? 'Login' : 'Signup'}
              </button>
            </div>

            <div className="mt-3 text-center">
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Signup here' : 'Login here'}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
