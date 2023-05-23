import CartItem from "@/components/CartItem";
import Head from "next/head";
import { useRouter, Router } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
}) => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pincode: "",
    postOfficeName: "",
    city: "",
    district: "",
    state: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      toast.warning(`You need to login first.`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      router.push("/");
      return;
    }
    setUserData((prev) => {
      return {
        ...prev,
        name: user.value.name,
        email: user.value.email,
      };
    });
  }, []);

  const handleInputChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePincodeChange = async (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        pincode: e.target.value,
      };
    });
    if (e.target.value.trim().length === 6) {
      fetchPincodeData(e.target.value);
    }
  };

  async function fetchPincodeData(pincode) {
    const url =
      "https://get-details-by-pin-code-india.p.rapidapi.com/detailsbypincode";
    console.log();
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
      body: JSON.stringify({ pincode }),
    };
    try {
      const response = await fetch(url, options);
      const { details } = await response.json();
      if (!details) {
        toast.warning(`Incorrect pin`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }
      setUserData((prev) => {
        return {
          ...prev,
          postOfficeName: details[0].postoffice_name,
          city: details[0].city_name,
          district: details[0].district_name,
          state: details[0].state_name,
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (
      userData.name.trim() === "" ||
      userData.address.trim() === "" ||
      userData.pincode.trim() === "" ||
      userData.phone.trim() === "" ||
      userData.city.trim() === "" ||
      userData.state.trim() === ""
    ) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [userData]);

  const handleSubmit = async () => {
    if (
      userData.name.trim() === "" ||
      userData.email.trim() === "" ||
      userData.address.trim() === "" ||
      userData.pincode.trim() === "" ||
      userData.phone.trim() === ""
    ) {
      toast.warning(`Input feilds mustn't be empty`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    if (Object.keys(cart).length === 0) {
      toast.warning(`cart is empty`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    initiatePayment();
  };

  const initiatePayment = async () => {
    const response = await fetch("http://localhost:3000/api/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subTotal, userData, cart }),
    });

    const orderRes = await response.json();

    if (!orderRes.success) {
      toast.warning(orderRes.message, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    const order = orderRes.order;

    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "DevelopersWear.",
      description: "Order payment",
      order_id: order.id,
      handler: async function (response) {
        const transRes = await fetch(
          "http://localhost:3000/api/posttransaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId: order.id, response }),
          }
        );
        const orderDetail = await transRes.json();

        clearCart();
        router.push(`/orderDetail?id=${orderDetail.order.orderId}`);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Example address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const loadRazorpay = () => {
      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    if (window.Razorpay) {
      loadRazorpay();
    } else {
      window.addEventListener("load", loadRazorpay);
    }
  };

  return (
    <section className="text-gray-600 body-font relative min-h-screen flex flex-col lg:flex-row w-full space-y-2 lg:space-y-0 lg:space-x-2 p-3 lg:p-14">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="container p-5 w-full lg:w-2/3">
        <div className="text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Checkout
          </h1>
        </div>
        <div className="my-5">Delivery Details</div>
        <div className="">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  readOnly={true}
                  className="w-full bg-gray-100 hover:cursor-not-allowed bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  maxLength={10}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={userData.pincode}
                  maxLength={6}
                  onChange={(e) => {
                    handlePincodeChange(e);
                  }}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="postOfficeName"
                  className="leading-7 text-sm text-gray-600"
                >
                  P/O name
                </label>
                <input
                  type="text"
                  id="postOfficeName"
                  name="postOfficeName"
                  value={userData.postOfficeName}
                  readOnly={true}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 hover:cursor-not-allowed bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userData.city}
                  readOnly={true}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 hover:cursor-not-allowed bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="district"
                  className="leading-7 text-sm text-gray-600"
                >
                  District
                </label>
                <input
                  type="test"
                  id="district"
                  name="district"
                  value={userData.district}
                  readOnly={true}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 hover:cursor-not-allowed bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  type="email"
                  id="state"
                  name="state"
                  value={userData.state}
                  readOnly={true}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="w-full bg-gray-100 hover:cursor-not-allowed bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"></div>
          </div>
        </div>
      </div>
      <div
        className={` sidebar flex flex-col space-y-5 w-full md:w-1/2 lg:w-1/3 h-full p-5`}
      >
        <header
          className={`cart w-full flex justify-between text-lg lg:text-xl`}
        >
          <span>Order Summary</span>
        </header>

        <div className="items">
          {Object.keys(cart).length == 0 && (
            <div className="w-full text-center"> Your cart is empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <CartItem
                key={k}
                itemCode={k}
                quantity={cart[k].qty}
                price={cart[k].price}
                title={cart[k].title}
                size={cart[k].size}
                color={cart[k].color}
                category={cart[k].category}
                desc={cart[k].desc}
                img={cart[k].img}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
        <div className="totalpriceDetails flex flex-col items-center space-y-4">
          <div className="divider w-full h-0.5 bg-gray-200 z-20"></div>
          <div className="subTotal flex justify-between w-full">
            <span>Subtotal</span>
            <span>${subTotal}</span>
          </div>
          <div className="Shipping flex justify-between w-full">
            <span>Shipping</span>
            <span>$5</span>
          </div>
          <div className="taxes flex justify-between w-full">
            <span>Taxes</span>
            <span>$3</span>
          </div>
          <div className="divider w-full h-0.5 bg-gray-200"></div>
          <div className="Total flex justify-between w-full">
            <span>Total</span>
            <span>${subTotal + 5 + 3}</span>
          </div>
        </div>
        <button
          className="text-white w-full bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300 rounded text-lg"
          disabled={disabled}
          onClick={() => {
            handleSubmit();
          }}
        >
          Confirm Order & Pay
        </button>
      </div>
    </section>
  );
};

export default Checkout;
