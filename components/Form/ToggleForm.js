import React from 'react'
import { toggleSignInSignUp } from '../../redux/formSlice'
import { useDispatch } from 'react-redux'

const ToggleForm = ({Account}) => {
    const dispatch = useDispatch()

    return (
        <p className="text-center">
        {Account[0]} have an account? {" "}
        <button 
        onClick={()=> dispatch(toggleSignInSignUp())}
        className="text-blue-500 hover:text-blue-600">
          Sign {Account[1]} here 
        </button>
      </p>
    )
}

export default ToggleForm
