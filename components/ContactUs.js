import Cancel from "./Buttons/Cancel";
import GoBack from "./Buttons/GoBack";

const ContactUs = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <GoBack />
        <h3 className="text-2xl font-medium text-gray-700">Your Orders</h3>
        <Cancel />
      </div>
      <hr className="my-3" />
      Feel free to reach us at
      <address>
        <a href="mailto:7adnan@gmail.com">7adnan@gmail.com</a>
        <a href="tel:+13115552368">(311) 555-2368</a>
      </address>
    </>
  );
};

export default ContactUs;
