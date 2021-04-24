import React from 'react';
import CartItems from './CartItems'
import CancelIcon from '../Svg/CancelIcon'
import { useSelector,useDispatch } from 'react-redux';
import { selectItem } from './cartSlice';
import { cancel } from '../../redux/sliderSlice';
import Checkout from './Checkout';

function Cart() {

const dispatch = useDispatch()
const item = useSelector(selectItem);
const isProductExist = item.length ? true : false

return (
      <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
        <button
          onClick={()=> dispatch(cancel())}
          className="text-gray-600 focus:outline-none"
        >
          <CancelIcon />
        </button>
      </div> 
      <hr className="" />
      <CartItems />
      {isProductExist  && <Checkout />}
    </>
  );
}

export default Cart;
