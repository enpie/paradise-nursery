import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert('Checkout functionality is Coming Soon!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Your Shopping Cart</h2>
      <h3 style={{ textAlign: 'center', color: '#2e7d32' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h4>{item.name}</h4>
                <p>Unit Price: ${item.cost}</p>
                <p>Subtotal: ${item.cost * item.quantity}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px' }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px' }}>+</button>
                <button onClick={() => handleRemove(item.name)} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button onClick={onContinueShopping} style={{ padding: '12px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Continue Shopping</button>
        <button onClick={handleCheckout} style={{ padding: '12px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;
