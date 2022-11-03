import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  add,
  decreaseCartItem,
  getTotalAmount,
  removeAllCartItem,
  removeCartItem,
} from '../features/cartSlice';

function Cart() {
  const products = useSelector((state) => state.cart.cart);
  const { totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const remove = (product) => {
    dispatch(removeCartItem(product));
  };
  const decrease = (product) => {
    dispatch(decreaseCartItem(product));
  };
  const increase = (product) => {
    dispatch(add(product));
  };
  const removeAll = () => {
    dispatch(removeAllCartItem());
  };

  useEffect(() => {
    dispatch(getTotalAmount());
  }, [products, dispatch]);

  return (
    <div>
      <h1>Your shopping cart is here</h1>

      <div>
        {products.length === 0 ? (
          <div>
            <p>Your cart is empty</p>
            <Link to="/">Go back</Link>
          </div>
        ) : (
          <>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              {products?.map((product, id) => (
                <tbody key={id}>
                  <tr style={{ margin: '15px', border: '1px solid black' }}>
                    <td
                      style={{
                        display: 'block',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '10px',
                      }}
                    >
                      <img
                        src={product.image}
                        alt="pImage"
                        style={{ width: '80px', heigth: '80px' }}
                      />
                      <div style={{ margin: '10px' }}>
                        <p>{product.name}</p>
                        <button onClick={() => remove(product)}>Remove</button>
                      </div>
                    </td>
                    <td>$ {product.price}</td>
                    <td>
                      <button
                        style={{ margin: '5px', width: '30px' }}
                        onClick={() => decrease(product)}
                      >
                        -
                      </button>
                      {product.cartQuantity}
                      <button
                        style={{ margin: '5px', width: '30px' }}
                        onClick={() => increase(product)}
                      >
                        +
                      </button>
                    </td>
                    <td>$ {product.price * product.cartQuantity}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '10px',
              }}
            >
              <button onClick={() => removeAll()}>Clear Cart</button>
              <div style={{ margin: '15px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    margin: '10px',
                    width: '300px',
                  }}
                >
                  <h3>Subtotal</h3>
                  <h3>$ {totalAmount}</h3>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button style={{ width: '100%', height: '30px' }}>
                  Check out
                </button>
                <br />
                <br />
                <Link to="/">Continue Shopping</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
