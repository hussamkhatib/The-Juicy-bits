import Back from '../Svg/Back'
import { openSliderComponent,cancel } from '../../redux/sliderSlice'
import { useDispatch } from 'react-redux' 
import CancelIcon from '../Svg/CancelIcon'

const Order = () => {
    const dispatch = useDispatch()
    return (
        <>
        <div className="flex items-center justify-between">
        <button
        onClick={()=> dispatch(openSliderComponent('profile'))}
            className="text-gray-600 focus:outline-none"
            >
                <Back />
            </button>
            <h3 className="text-2xl font-medium text-gray-700">Your Orders</h3>
            <button
          onClick={()=> dispatch(cancel())}
          className="text-gray-600 focus:outline-none"
        >
          <CancelIcon />
        </button>
        </div>
        <hr className="my-3" />
        </>
    )
}

export default Order
