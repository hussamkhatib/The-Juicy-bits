import { RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { updateUserShippingDetails } from "../../../src/firebase/user.firebase";
import {
  setShippingAddress,
  shippingAddressSelector,
} from "../../../src/redux/orderSlice";
import { addShippingAddress } from "../../../src/redux/shippingAddressSlice";
import { shippingAddressesSelector } from "../../../src/redux/shippingAddressSlice";
import { openSlider } from "../../../src/redux/sliderSlice";
import Button from "../Button";

const ShippingAddress = () => {
  const dispatch = useDispatch();
  // selected shipping address
  const shippingAddress = useSelector(shippingAddressSelector);

  return (
    <div>
      <AddNewShippingAddress />
      <Button
        disabled={!shippingAddress}
        padding="px-3 py-2"
        className="w-full flex items-center justify-center mt-4 text-sm uppercase font-medium"
        onClick={() => dispatch(openSlider("Checkout"))}
      >
        Continue
      </Button>
    </div>
  );
};

export default ShippingAddress;

const AddNewShippingAddress = () => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  return formIsOpen ? (
    <AddNewShippingAddressForm setFormIsOpen={setFormIsOpen} />
  ) : (
    <>
      <SelectAddress />
      <Button
        variant="primary"
        padding="px-3 py-2"
        className="w-full flex items-center justify-center mt-4 text-sm uppercase font-medium"
        onClick={() => setFormIsOpen(true)}
      >
        Add New Address <PlusIcon className="h-5 w-5 ml-2" aria-hidden />
      </Button>
    </>
  );
};

const AddNewShippingAddressForm = ({ setFormIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    await updateUserShippingDetails(data);
    setFormIsOpen(false);
    dispatch(addShippingAddress(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="py-2 flex flex-col" htmlFor="name">
        <span>Name</span>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("name", { required: true, maxLength: 40 })}
          type="text"
          id="name"
        />
      </label>
      <label className="py-2 flex flex-col">
        <span>Mobile</span>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("mobile", { maxLength: 10 })}
          type="tel"
        />
      </label>
      <label className="py-2 flex flex-col">
        <span>Pincode</span>
        <input
          className="border-b-2 border-gray-400 border-solid"
          {...register("pincode", { maxLength: 6 })}
          type="tel"
        />
      </label>
      <label className="py-2 flex flex-col">
        <span>Address</span>
        <textarea
          className="border-b-2 border-gray-400 border-solid resize-none"
          {...register("address", { maxLength: 100 })}
          type="tel"
        />
      </label>

      <p>Type of Address</p>
      <div className="flex gap-x-4">
        <label htmlFor="addressChoice1">
          <input
            {...register("addressChoice", { required: true })}
            type="radio"
            id="addressChoice1"
            value="home"
            className="mr-2"
          />
          Home
        </label>

        <div>
          <label htmlFor="addressChoice2">
            <input
              {...register("addressChoice", { required: true })}
              className="mr-2"
              type="radio"
              id="addressChoice2"
              value="office"
            />
            Office
          </label>
        </div>
      </div>

      <div className="flex gap-x-4 py-4">
        <Button
          onClick={() => setFormIsOpen(false)}
          className="w-full"
          type="button"
        >
          Cancel
        </Button>
        <Button variant="primary" className="w-full" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

const SelectAddress = () => {
  const dispatch = useDispatch();
  // all shipping addresses
  const shippingAddresses = useSelector(shippingAddressesSelector);
  // selected shipping address
  const shippingAddress = useSelector(shippingAddressSelector);

  return (
    <div className="mx-auto w-full max-w-md">
      <RadioGroup
        value={shippingAddress}
        onChange={(value) => dispatch(setShippingAddress(value))}
      >
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-2">
          {shippingAddresses.map((shippingAddress) => (
            <RadioGroup.Option
              key={shippingAddress.id}
              value={shippingAddress}
              className={({ active }) =>
                `${
                  active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-black"
                    : ""
                } bg-white relative flex cursor-pointer rounded-lg px-2 py-4 shadow-md focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <div className="grid w-full gap-x-2 grid-cols-[1fr_1.5em] items-center">
                    <div className=" gap-x-4 text-sm">
                      <RadioGroup.Label
                        as="p"
                        className="font-medium text-gray-900"
                      >
                        {shippingAddress.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="inline $text-gray-500 text-xs"
                      >
                        <span>{shippingAddress.address}</span>{" "}
                      </RadioGroup.Description>
                    </div>

                    {checked && (
                      <CheckCircleIcon
                        className="h-6 w-6 shrink-0"
                        aria-hidden
                      />
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export const EditShippingAddress = ({ shippingAddress }) => {
  const dispatch = useDispatch();

  return shippingAddress ? (
    <div className="grid w-full gap-x-2 grid-cols-[1fr_1.5em] items-center">
      <div className=" gap-x-4 text-sm">
        <p className="font-medium text-gray-900">
          {shippingAddress.addressChoice}
        </p>
        <span className="inline $text-gray-500 text-xs">
          <span>{shippingAddress.address}</span>{" "}
        </span>
      </div>
      <button onClick={() => dispatch(openSlider("Shipping Address"))}>
        <PencilIcon className="h-5 w-5" aria-hidden />
      </button>
    </div>
  ) : null;
};
