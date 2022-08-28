import { useState } from "react";

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
  const title =
    map.get("sign-up").state === signinOrSignup ? "Sign Up" : "Sign In";
  const main =
    map.get("sign-up").state === signinOrSignup ? (
      <SignUp
        closeDialog={() => setOpen(false)}
        toggleForm={(state) => setSignInOrSignUp(!state)}
      />
    ) : (
      <SignIn
        closeDialog={() => setOpen(false)}
        toggleForm={(state) => setSignInOrSignUp(state === 0 ? 1 : 0)}
      />
    );
  return (
    <>
      <button
        className="p-2 text-white bg-blue-500 hover:bg-blue-300"
        onClick={() => setOpen(true)}
      >
        Sign Up
      </button>
      <Modal title={title} main={main} state={{ open, setOpen }} />
    </>
  );
};

export default Authenticate;
