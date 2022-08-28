import React, { useState } from "react";
import { useSelector } from "react-redux";

import { userLoggedState } from "../../src/redux/userSlice";
// import { updateShippingDetails } from "../../firebase/config";
import SliderHeader from "../SliderHeader";

const EditProfile = () => {
  const userShippingDetails = useSelector(userLoggedState);

  const [state, setState] = useState({
    mobileNumber: userShippingDetails.mobileNumber,
    location: userShippingDetails.location,
    pincode: userShippingDetails.pincode,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateShippingDetails(state);
  };

  return (
    <div>
      <SliderHeader Component="Edit Profile" />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="mobileNumber">Mobile number</label>
          <input
            value={state.mobileNumber}
            onChange={handleChange}
            className="border-2 border-gray-400 border-solid"
            type="tel"
            maxLength="10"
            name="mobileNumber"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">Location</label>
          <textarea
            value={state.location}
            onChange={handleChange}
            className="border-2 border-gray-400 border-solid"
            type="text"
            name="location"
            required
          >
            askaksjb
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pincode">Pincode</label>
          <input
            value={state.pincode}
            onChange={handleChange}
            className="border-2 border-gray-400 border-solid"
            type="tel"
            maxLength="6"
            name="pincode"
            required
          />
        </div>
        <button className="bg-blue-500 text-white py-2  px-1 my-3">
          SAVE LOCATION
        </button>
        <button className="bg-red-500 text-white py-2  px-1 my-3">
          CHANGE PASSWORD
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
