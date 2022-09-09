import classNames from "classnames";
import React from "react";

const Button = (props) => {
  const { variant = "plain", loading = false, padding, ...restProps } = props;

  const disabled = props.disabled || loading;

  const baseStyles = "text-white my-3 rounded-sm";
  const basePadding = "p-2";
  const classes = classNames(
    baseStyles,
    // variant
    variant === "primary" &&
      (disabled
        ? "border border-transparent bg-gray-400"
        : "bg-indigo-600 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900"),
    variant === "plain" &&
      (disabled
        ? "text-gray-400 bg-transparent"
        : "text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:bg-gray-100 focus:ring-neutral-500"),

    loading ? "cursor-wait" : disabled ? "cursor-not-allowed" : "",
    padding || basePadding,
    props.className
  );

  return (
    <button {...restProps} disabled={disabled} className={classes}>
      {loading && "Loading... "}
      {props.children}
    </button>
  );
};

export default Button;
