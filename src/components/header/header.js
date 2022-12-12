import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export const Header = () => {
  return (
    <div className="header">
      <Link to="/sign-up">
        <button className="btn">Sign Up</button>
      </Link>
      <Link to="/sign-in">
        <button className="btn">Sign In</button>
      </Link>
    </div>
  );
};
