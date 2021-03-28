import { useState ,useEffect } from 'react'
import { urlFor, PortableText, getClient } from "../utils/sanity";
import { addItem } from './Cart/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { openCart } from './Cart/openCartSlice';

import CartIcon from './Svg/CartIcon';
import Plus from './Svg/Plus'
import Minus from './Svg/Minus'
import { selectItem } from './Cart/cartSlice'

function ProductPage(props) {
  const [count, setCount] = useState(1)
  const [addedToCart,setAddedToCart] = useState(false)
  const handleCount = (value) => !(count === 0 && value === -1) ? setCount(count + value) : count
  const { title, defaultProductVariant, mainImage, body } = props;
  
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItem)
  const cartTitles = cartItems.map(i=>i.title)
  
  useEffect(() => {    
    if(cartTitles.includes(title)){
      setAddedToCart(true)
    }else{
    setAddedToCart(false)
    }
  });

  function addOrMoveToCart() {
    if(!addedToCart){
    return (
      <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Count:
            </label>
            <div className="flex items-center mt-1">
              <button onClick={() => handleCount(1)}className="text-gray-500 focus:outline-none focus:text-gray-600">
                <Plus />
              </button>
              <span className="text-gray-700 text-lg mx-2">{count}</span>
              <button onClick={() => handleCount(-1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                <Minus />
              </button>
            </div>
      <button onClick={()=> dispatch(addItem([title,count,mainImage,defaultProductVariant?.price]))}
      className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
        Add to Cart   <CartIcon />
      </button>
      </div>
    )
    }else{
      return (
        <>
        <div className='px-4'>Item added</div>
        <button onClick={()=>dispatch(openCart())}
        className="flex px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          Move to cart
        </button>
        </>
      )
    }
  }

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={urlFor(mainImage)
              .auto("format")
              .width(1051)
              .fit("crop")
              .quality(80)}
            alt={mainImage?.alt || `Photo of ${title}`}
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">{title}</h3>
          <span className="text-gray-500 mt-3">
            Rs {defaultProductVariant?.price}
          </span>
          <hr className="my-3" />
          
          <div className="flex items-center mt-6">
              {addOrMoveToCart()}
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Description</h3>
        {body && <PortableText blocks={body?.en} className="text-gray-600" />}
      </div>
    </div>
  );
}

export default ProductPage;
