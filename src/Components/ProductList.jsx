import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=200", cost: 15 },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=200", cost: 12 },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=200", cost: 18 },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1517161869820-22c608149e31?q=80&w=200", cost: 14 },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=200", cost: 10 },
        { name: "English Ivy", image: "https://images.unsplash.com/photo-1581442163454-94672e811c0f?q=80&w=200", cost: 13 }
      ]
    },
    {
      category: "Low Maintenance",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?q=80&w=200", cost: 20 },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=200", cost: 11 },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=200", cost: 25 },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1598880940375-4a0ee7b3b4d3?q=80&w=200", cost: 15 },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1520302832328-9917d16f862c?q=80&w=200", cost: 8 },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=200", cost: 19 }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=200", cost: 16 },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=200", cost: 14 },
        { name: "Mint", image: "https://images.unsplash.com/photo-1603011989442-3d4439c0fa1e?q=80&w=200", cost: 9 },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?q=80&w=200", cost: 22 },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=200", cost: 12 },
        { name: "Oregano", image: "https://images.unsplash.com/photo-1601642223019-9477aa2d5930?q=80&w=200", cost: 10 }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div><h2 style={{margin: 0, cursor: 'pointer'}} onClick={() => {setShowCart(false); setShowAbout(false);}}>Paradise Nursery</h2></div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" onClick={() => {setShowCart(false); setShowAbout(true);}} style={{color: 'white', textDecoration: 'none'}}>Home (About)</a>
          <a href="#" onClick={() => {setShowCart(false); setShowAbout(false);}} style={{color: 'white', textDecoration: 'none'}}>Plants</a>
          <a href="#" onClick={() => setShowCart(true)} style={{color: 'white', textDecoration: 'none', position: 'relative'}}>
            🛒 Cart ({totalCartCount})
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : showAbout ? (
        <AboutUs />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryGroup, index) => (
            <div key={index}>
              <h2 style={{ textAlign: 'center', margin: '40px 0 20px 0', color: '#2e7d32' }}>{categoryGroup.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '0 20px' }}>
                {categoryGroup.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold' }}>${plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isPlantInCart(plant.name)}
                      style={{
                        padding: '10px 15px', 
                        backgroundColor: isPlantInCart(plant.name) ? '#ccc' : '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: isPlantInCart(plant.name) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isPlantInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
