import PrimaryProfileItems from './PrimaryProfileItems';

const ProfileItems = ({Logout}) => {

    return (
        <div>
            <PrimaryProfileItems />
            <hr className="my-3" />
            <div className='hover:bg-gray-200 py-1'>
                Edit Profile
            </div>
            <button
            onClick={Logout}
            className='w-full text-left hover:bg-gray-200 py-1'>
                Logout
            </button>
        </div>
    )
}

export default ProfileItems
