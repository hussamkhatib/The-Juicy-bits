import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectItem,removeItem,increment,decrement } from './cartSlice';
import { urlFor } from "../../utils/sanity";
import Plus from '../Svg/Plus'
import Minus from '../Svg/Minus'
import Trash from '../Svg/Trash'
import { auth, deleteProductId } from '../../firebase/config'

const CartItems = () => {
    
const dispatch = useDispatch();
const item = useSelector(selectItem);

if(!item.length){
  return <div>Your Cart is Empty</div>;
}

const removeProductFromCart = (index) => {
  dispatch(removeItem(index))
  deleteProductId(auth.currentUser.uid,item[index].id)
  console.log('deletion product from cart called')
}

return (
        <>
            {item.map((item,index) => (
        <div 
        key={item.title} className="flex justify-between mt-6">
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded"
              src={urlFor(item.mainImage)
                .auto("format")
                .width(200)
                .fit("crop")
                .quality(80)}
              alt={item.mainImage?.alt || `Photo of ${item.title}`}
            />
            <div className="mx-3">
              <h3 className="text-sm text-gray-600">{item.title}</h3>
              <div className="flex items-center mt-2">
                <button onClick={() => dispatch(increment(index))}
                className="text-gray-500 focus:outline-none focus:text-gray-600">
                 <Plus />
                </button>
                <span className="text-gray-700 mx-2">{item.quantity}</span>
                <button 
                disabled={item.quantity<2}
                onClick={()=> dispatch(decrement(index))}
                className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <Minus />
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-gray-600">Rs {item.defaultProductVariant?.price}</span>
            <button onClick={()=>removeProductFromCart(index)}
             className=''>
               <Trash />
             </button>
          </div>
        </div>
      ))}
        </>
    )
}

export default CartItems
