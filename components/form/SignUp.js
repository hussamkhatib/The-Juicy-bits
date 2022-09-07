import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createUserWithEmailAndPassword } from "../../src/firebase/user.firebase";
import Button from "../common/Button";

const schema = z.object({
  displayName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const SignUp = ({ closeDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState(null);
  const [passMatchErr, setPassMatchErr] = useState(false);
  const onSubmit = async (data) => {
    const { email, password, confirmPassword, displayName } = data;

    if (password === confirmPassword) {
      setPassMatchErr(false);
      const { user, error } = await createUserWithEmailAndPassword(
        email,
        password,
        {
          sendEmailVerification: false,
          displayName,
        }
      );
      if (user) closeDialog();
      if (error) setError(error);
    }
    setPassMatchErr(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
      {error && <span>{error}</span>}
      <p className="text-sm">All the fields marked with * are required</p>
      <div className="py-1 md:py-2 flex flex-col">
        <label>Display name*</label>
        <input
          {...register("displayName", { required: "Name Address is required" })}
          className="border-b-2 border-gray-400 border-solid"
          aria-describedby="displayName-errors"
          aria-invalid={Boolean(errors?.displayName)}
          type="text"
          required
        />
        <span id="displayName-errors" className="text-red-500">
          {errors.displayName?.message}
        </span>
      </div>
      <div className="py:1 md:py-2 flex flex-col">
        <label htmlFor="email">Email*</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("email", { required: "Email Address is required" })}
          aria-describedby="email-errors"
          aria-invalid={Boolean(errors?.email)}
          type="email"
          required
        />
        <span id="email-errors" className="text-red-500">
          {errors.email?.message}
        </span>
      </div>
      <div className="py-1 md:py-2 flex flex-col">
        <label htmlFor="pass">Password*</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("password", {
            minLength: 8,
            required: "Password is required",
          })}
          type="password"
          aria-describedby="password-errors"
          aria-invalid={Boolean(errors?.password)}
          minLength="8"
          required
        />
        <span id="password-errors" className="text-red-500">
          {errors.password?.message}
        </span>
      </div>
      <div className="py-1 md:py-2 flex flex-col">
        <label htmlFor="pass">Confirm Password*</label>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("confirmPassword", {
            minLength: 8,
            required: "Password is required",
          })}
          aria-describedby="confirmPassword-errors"
          aria-invalid={
            Boolean(errors?.confirmPassword) || Boolean(passMatchErr)
          }
          type="password"
          minLength="8"
          required
        />
        <span id="confirmPassword-errors" className="text-red-500">
          {errors.confirmPassword?.message ||
            (passMatchErr && "Password does not match")}
        </span>
      </div>

      <Button className=" w-full" variant="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
