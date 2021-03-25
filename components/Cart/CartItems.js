import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectItem,addItem,removeItem } from './cartSlice';
import Plus from '../Svg/Plus'
import Minus from '../Svg/Minus'

const CartItems = () => {
    
const dispatch = useDispatch();
const item = useSelector(selectItem);

if(!item.length){
  return <div>Your Cart is Empty</div>;
}
return (
        <>
            {item.map((item,index) => (
        <div 
        key={item.title} className="flex justify-between mt-6">
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded"
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
              alt=""
            />
            <div className="mx-3">
              <h3 className="text-sm text-gray-600">{item.title}</h3>
              <div className="flex items-center mt-2">
                <button
                onClick={() => dispatch(addItem())} 
                className="text-gray-500 focus:outline-none focus:text-gray-600">
                 <Plus />
                </button>
                <span className="text-gray-700 mx-2">{item.quantity}</span>
                <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <Minus />
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span className="text-gray-600">15$</span>
            <button onClick={()=> dispatch(removeItem(index))}
             className='text-red-500 border-2 border-red-500'>Delete</button>
          </div>
        </div>
      ))}
        </>
    )
}

export default CartItems
