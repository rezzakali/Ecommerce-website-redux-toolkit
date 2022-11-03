import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
        <span className="quantity">{totalQuantity}</span>
      </li>
    </ul>
  );
}

export default Navbar;
