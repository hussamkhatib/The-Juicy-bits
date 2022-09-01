import React from "react";
import { useForm } from "react-hook-form";

import { signInWithEmailAndPassword } from "../../src/firebase/user.firebase";

const SignIn = ({ closeDialog, toggleForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(email, password);
    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
      <div className="py-2 flex flex-col">
        <label htmlFor="email">email</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("email", { required: "Email Address is required" })}
        />
      </div>
      <div className="py-2 flex flex-col">
        <label htmlFor="pass">Password</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
          type="password"
        />
      </div>

      <div className="flex py-4">
        <button type="submit" className="py-2 bg-blue-500 text-white w-full">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
