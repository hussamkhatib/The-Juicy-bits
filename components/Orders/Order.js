import Back from '../Svg/Back'
import { openSliderComponent } from '../../redux/sliderSlice'
import { useDispatch } from 'react-redux' 

const Order = () => {
    const dispatch = useDispatch()
    return (
        <>
        <div className="flex">
        <button
        onClick={()=> dispatch(openSliderComponent('profile'))}
            className="text-gray-600 focus:outline-none"
            >
                <Back />
            </button>
            <h3 className="text-2xl font-medium text-gray-700">Your Orders</h3>
         
        </div>
        <hr className="my-3" />
        </>
    )
}

export default Order
