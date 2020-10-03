import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {

  return (
    <>
      <h1 style={{
        background: '#2ecc71',
        color: '#fff',
        padding: '5px',
        display: 'inline-block'
      }}><Link to="/register">Signup</Link></h1>
      <h1 style={{
        background: '#f1c40f',
        color: '#fff',
        padding: '5px',
        display: 'inline-block'
      }}><Link to="/login">Login</Link></h1>
    </>
  )
}

export default LandingPage;