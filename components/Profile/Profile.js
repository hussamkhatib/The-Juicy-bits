import CancelIcon from  '../Svg/CancelIcon'
import { useSelector,useDispatch } from 'react-redux';
import { cancel } from '../../redux/sliderSlice';
import ProfileItems from './ProfileItems';
import { userLoggedState } from '../../redux/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const { name } = useSelector(userLoggedState)

    return (
        <>
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium text-gray-700">Hello {name && name}</h3>
            <button
            onClick={()=> dispatch(cancel())}
            className="text-gray-600 focus:outline-none"
            >
            <CancelIcon />
            </button>
        </div>
        <hr className="my-3" />
        <ProfileItems />
        </>
    )
}

export default Profile
