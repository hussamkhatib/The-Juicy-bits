import React from 'react';
import RightArrow from '../Svg/RightArrow';
import CartItems from './CartItems'
import CancelIcon from '../Svg/CancelIcon'
import { useDispatch } from 'react-redux';
import { toggleCart } from './openCartSlice';

//const query = groq`*[_type == "product" && slug.current == $slug][0]`;

function Cart({ cartOpen }) {

const dispatch = useDispatch()

return (
    <div
      className={`${
        cartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
      } fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button
          onClick={()=> dispatch(toggleCart())}
          className="text-gray-600 focus:outline-none"
        >
          <CancelIcon />
        </button>
      </div> 
      <hr className="my-3" />
      <CartItems />

      <div className="mt-8">
        <form className="flex items-center justify-center">
          <input
            className="form-input w-48"
            type="text"
            placeholder="Add promocode"
          />
          <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            <span>Apply</span>
          </button>
        </form>
      </div>
      <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
        <span>Chechout</span>
      <RightArrow />
      </a>
    </div>
  );
}

export default Cart;
