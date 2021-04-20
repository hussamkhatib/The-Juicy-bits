import { useDispatch } from 'react-redux';
import { openSliderComponent } from '../../redux/sliderSlice'

const ProfileItems = ({Logout}) => {
    const dispatch = useDispatch()

    return (
        <div>
             <button 
            onClick={()=> dispatch(openSliderComponent('order'))}
            className='hover:bg-gray-200 py-1 block text-left text-left'>
                Orders
            </button>
            <button 
            onClick={()=> dispatch(openSliderComponent('cart'))}
            className='hover:bg-gray-200 py-1 block text-left text-left'>
                Cart
            </button>
            <div className='hover:bg-gray-200 py-1'>
                Contact us 
            </div>
            <hr className="my-3" />
            <div className='hover:bg-gray-200 py-1'>
                Edit Profile
            </div>
            <button
            onClick={Logout}
            className='hover:bg-gray-200 py-1'>
                Logout
            </button>
        </div>
    )
}

export default ProfileItems
