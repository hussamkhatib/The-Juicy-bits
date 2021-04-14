import ProfileIcon from '../Svg/ProfileIcon'
import { useDispatch } from 'react-redux';
import { openProfile } from '../../redux/sliderSlice';

const ProfileNavLink = () => {
    const dispatch = useDispatch()
    return (
        <button
        onClick={()=> dispatch(openProfile())}
        className="text-gray-600 flex flex-col items-center w-full ">
            <ProfileIcon />
            <div className='text-xs focus:outline-none sm:mx-0'>
                Profile
            </div>
        </button>
    )
}

export default ProfileNavLink
