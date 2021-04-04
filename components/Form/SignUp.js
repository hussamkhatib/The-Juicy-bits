import React,{ useState } from 'react'
import { auth,createUserProfileDocument, signInWithGoogle } from '../../firebase/config'

const SignUp = ({SignInUser,Close}) => {
    const [state, setState] = useState({
        displayName: "",
        email: "",
        password:'',
        confirmPassword:'',
        passwordMatch: true
      })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
      passwordMatch,
    } = state;
    if (password !== confirmPassword) {
      //   alert("passwords dont's match");
      setState({
        ...state,
        passwordMatch: false,
      });
      console.log({passwordMatch});
      return;
    }
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      await user.updateProfile({
        displayName: state.displayName,
      })
      await createUserProfileDocument(user, {displayName});
    }
    catch(error){
      console.log(error.message)
    }

    setState({
        displayName: "",
        email: "",
        password:'',
        confirmPassword:'',
        passwordMatch: true
      })
  };
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
            <button 
            type='submit' className='py-2 bg-blue-500 text-white w-full'>
                Sign up
            </button>
            </div>
            <p className="text-center">or</p>
            <button
            onClick={signInWithGoogle}
            className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
            >
          Sign In with Google
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <button 
          onClick={SignInUser}
          className="text-blue-500 hover:text-blue-600">
            Sign in here
          </button>
        </p>
        </form>
    )
}

export default SignUp
