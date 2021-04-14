import CancelIcon from  '../Svg/CancelIcon'
import { useDispatch } from 'react-redux';
import { cancel } from '../../redux/sliderSlice';

const Profile = () => {
    const dispatch = useDispatch()

    return (
        <>
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium text-gray-700">Your Profile</h3>
            <button
            onClick={()=> dispatch(cancel())}
            className="text-gray-600 focus:outline-none"
            >
            <CancelIcon />
            </button>
        </div>
        </>
    )
}

export default Profile
