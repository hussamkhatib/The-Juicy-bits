import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { signInWithEmailAndPassword } from "../../src/firebase/user.firebase";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignIn = ({ closeDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    const { email, password } = data;
    const { user, error } = await signInWithEmailAndPassword(email, password);
    if (user) closeDialog();
    if (error) setError(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
      <p className="text-sm">All the fields marked with * are required</p>
      {error && <span>{error}</span>}
      <div className="py-2 flex flex-col">
        <label htmlFor="email">Email*</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("email", { required: "Email Address is required" })}
          aria-describedby="email-errors"
          aria-invalid={Boolean(errors?.email)}
          required
        />
        <span id="email-errors" className="text-red-500">
          {errors.email?.message}
        </span>
      </div>
      <div className="py-2 flex flex-col">
        <label htmlFor="pass">Password*</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
          type="password"
          aria-describedby="password-errors"
          aria-invalid={Boolean(errors?.password)}
          required
        />
        <span id="password-errors" className="text-red-500">
          {errors.password?.message}
        </span>
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
