import React,{ useState,useRef,useEffect } from 'react'
import { auth,signInWithGoogle } from '../../firebase/config'
import ToggleForm from './ToggleForm'
import { useDispatch } from 'react-redux'
import { toggleForm } from '../../redux/formSlice' 

const SignIn = () => {
  const _isMounted = useRef(true)
  useEffect(() => {
    return () => {
        _isMounted.current = false;
    }
  }, []);
  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: "",
    password:''
  })
  const handleSubmit = async (e) => {
  e.preventDefault()
  const { email,password } = state
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(toggleForm())
    setState({
      email: "",
      password:''
    })
  } catch (error) {
     console.log(error.message) 
  }
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

            <div className='flex py-4'>
            <button type='submit' className='py-2 bg-blue-500 text-white w-full'>
                Sign In
            </button>
            </div>
            <p className="text-center">or</p>
            <button
            onClick={signInWithGoogle}
            className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
            >
          Sign In with Google
        </button>
  
        <ToggleForm 
          Account= {['Dont','up']}
        />
        </form>
    )
}

export default SignIn
