import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../features/cartSlice';
import { fetchProducts } from '../features/productSlice';

function Home() {
  const {
    item: products,
    error,
    isLoading,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(add(product));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home page</h1>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {products?.map((product, id) => {
          return (
            <div
              key={id}
              style={{
                border: '1px solid gray',
                width: '400px',
                height: '400px',
                margin: '10px',
                borderRadius: '5px',
              }}
            >
              <h2>{product.name}</h2>
              <img
                src={product.image}
                alt="pImage"
                style={{ width: '150px', height: '150px' }}
              />
              <p>{product.description}</p>
              <p>$ {product.price}</p>

              <button onClick={() => addToCart(product)}>Add to cart</button>
              <button>Buy now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
