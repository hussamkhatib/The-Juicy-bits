import { useState } from "react";

import {
  logInWithGoogle,
  signInAnonymously,
} from "../../src/firebase/user.firebase";
import Button from "../common/Button";
import Modal from "../common/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const map = new Map();

map.set("sign-up", {
  state: 0,
  name: "Sign Up",
});
map.set("sign-in", {
  state: 1,
  name: "Sign In",
});

const Authenticate = () => {
  const [open, setOpen] = useState(false);
  const [signinOrSignup, setSignInOrSignUp] = useState(0);

  // if user logs in using google provider

  const title =
    map.get("sign-up").state === signinOrSignup ? "Sign Up" : "Sign In";
  const main = (
    <>
      {map.get("sign-up").state === signinOrSignup ? (
        <SignUp
          closeDialog={() => setOpen(false)}
          toggleForm={(state) => setSignInOrSignUp(!state)}
        />
      ) : (
        <SignIn
          closeDialog={() => setOpen(false)}
          toggleForm={(state) => setSignInOrSignUp(state === 0 ? 1 : 0)}
        />
      )}
      <div>
        <p className="text-center">or</p>
        <div className="flex gap-x-2">
          <Button
            onClick={() => logInWithGoogle()}
            variant="custom"
            className="bg-red-500 hover:bg-red-600 w-full my-1"
          >
            Sign in with Google
          </Button>
          <Button
            onClick={() => signInAnonymously()}
            variant="plain"
            className="w-full"
          >
            Sign in Anonymously
          </Button>
        </div>
      </div>
      {signinOrSignup ? (
        <p className="text-center">
          Dont have an account?{" "}
          <Button
            onClick={() => setSignInOrSignUp(0)}
            padding="py-0"
            className="my-0"
          >
            Sign up here
          </Button>
        </p>
      ) : (
        <p className="text-center">
          Already have an account?{" "}
          <Button
            onClick={() => setSignInOrSignUp(1)}
            padding="py-0"
            className="my-0"
          >
            Sign in here
          </Button>
        </p>
      )}
    </>
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="primary">
        Sign Up
      </Button>
      <Modal title={title} main={main} state={{ open, setOpen }} />
    </>
  );
};

export default Authenticate;
