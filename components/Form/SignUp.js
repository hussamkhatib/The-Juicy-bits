import React,{ useState } from 'react'


const SignUp = () => {

   /* const [displayName,setDisplayName] = useState('')
    const [emailId,setEmailId] = useState('')
    const [pass,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const [passMatch,setPassMatch] = useState(true) */

    const [state, setState] = useState({
        displayName: "",
        email: "",
        password:'',
        confirmPassword:'',
        passwordMatch: true
      })
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    return (
        <form onSubmit={handleSubmit} className='p-6 overflow-y-auto'>
            <div className='py-2 flex flex-col'>
                <label>Display name</label>
                <input 
                    value={state.displayName}
                    onChange={handleChange}
                    className='border-b-2 border-gray-400 border-solid' 
                    type="text" 
                    name="displayName" 
                    required>
                </input>
            </div>
            <div className='py-2 flex flex-col'>
                <label htmlFor="email">email</label>
                <input 
                value={state.email}
                onChange={handleChange}
                className='border-b-2 border-gray-400 border-solid' 
                type="email" 
                name="email" 
                required>
                </input>
            </div>
            <div className='py-2 flex flex-col'>    
                <label htmlFor="pass">Password</label>
                <input  
                    className='border-b-2 border-gray-400 border-solid'
                    value={state.password}
                    onChange={handleChange}
                    type="password" 
                    name="password"
                    minLength="8"
                    required> 
                </input>
            </div>
            <div className='py-2 flex flex-col'>    
                <label htmlFor="pass">Confirm Password</label>
                <input  
                className='border-b-2 border-gray-400 border-solid' 
                value={state.confirmPassword}
                onChange={handleChange}
                type="password" 
                name="confirmPassword"
                minLength="8" 
                required></input>
            </div>
            <div className='flex py-4'>
            <button type='submit' className='py-2 bg-blue-500 text-white w-full'>
                Create
            </button>
            </div>
        </form>
    )
}

export default SignUp
