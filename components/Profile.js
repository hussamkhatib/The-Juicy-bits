import ProfileIcon from './Svg/ProfileIcon'
const Profile = () => {
    return (
        <div className="text-gray-600 flex flex-col items-center w-full ">
            <ProfileIcon />
            <div className='text-xs focus:outline-none sm:mx-0'>
                Profile
            </div>
        </div>
    )
}

export default Profile
