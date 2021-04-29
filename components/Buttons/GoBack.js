import { openSliderComponent } from '../../redux/sliderSlice'
import { useDispatch } from 'react-redux' 
import Back from '../Svg/Back'


const GoBack = () => {
    const dispatch = useDispatch()
    return (
        <button
        onClick={()=> dispatch(openSliderComponent('profile'))}
            className="text-gray-600 focus:outline-none"
            >
                <Back />
            </button>
    )
}

export default GoBack
