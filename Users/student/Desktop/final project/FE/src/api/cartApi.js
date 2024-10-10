// src/api/cartApi.js
import instance from '@/api/index.js';

// Fetch initial cart list from the backend (e.g., for initial setup)
export async function fetchCartList() {
  try {
    const response = await instance.get('/cart/init');
    console.log('Initial cart list fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching initial cart list:', error);
    throw error;
  }
}

// Fetch the current cart list from the backend
export async function getCartList() {
  try {
    const response = await instance.get('/cart/list');
    console.log('Fetched cart list data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart list:', error);
    throw error;
  }
}

// Add a new item to the cart
export async function postCartItem(cartItem) {
  try {
    const response = await instance.post('/cart/items', cartItem);
    console.log('Added item to cart via API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart via API:', error);
    throw error;
  }
}

// Delete an item from the cart
export async function deleteCartItem(cartId) {
  try {
    const response = await instance.delete(`/cart/items/${cartId}`);
    console.log(`Deleted item with ID ${cartId} from cart`);
    return response;
  } catch (error) {
    console.error(`Error deleting cart item with ID ${cartId}:`, error);
    throw error;
  }
}
  