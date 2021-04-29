import React from 'react';
import CartItems from './CartItems'
import { useSelector } from 'react-redux';
import { selectItem } from './cartSlice';
import Checkout from './Checkout';
import Cancel from '../Buttons/Cancel';

function Cart() {

const item = useSelector(selectItem);
const isProductExist = item.length ? true : false

return (
      <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <Cancel />
      </div> 
      <hr />
      <CartItems />
      {isProductExist  && <Checkout />}
    </>
  );
}

export default Cart;
