import SignUp from "./SignUp";
import SignIn from "./SignIn";
import styles from "./SignUp.module.css";
import { toggleForm, signInOrSignOutComponent } from "../../redux/formSlice";
import { useDispatch, useSelector } from "react-redux";

const SignupContainer = () => {
  const dispatch = useDispatch();
  const signInOrUp = useSelector(signInOrSignOutComponent);

  return (
    <div className="fixed flex flex-row justify-center inset-0 z-10 border-gray-500 py-3">
      <div className="max-w-xl w-full relative flex flex-col border-pink-900 border-solid border-4 rounded-xl bg-white">
        <div className={`${styles.pos} absolute top-3`}>
          <button className="" onClick={() => dispatch(toggleForm())}>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: "3px",
                overflow: "visible",
              }}
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="m6 6 20 20"></path>
              <path d="m26 6-20 20"></path>
            </svg>
          </button>
        </div>
        <header
          className={`${styles.minW16} flex items-center justify-between flex-none w-full min-w-16 border-b-2 border-gray-200 border-solid font-extrabold`}
        >
          <div className={`${styles.flexEnds} text-left`}></div>
          <div className="text-center flex-initial overflow-hidden mx-4">
            {signInOrUp}
          </div>
          <div className={`${styles.flexEnds} text-right`}></div>
        </header>
        {signInOrUp === "Sign up" ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
};

export default SignupContainer;
