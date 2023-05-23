import React, { useState } from "react";
import Link from "next/link";
import { BiCartAlt } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import CartItem from "./CartItem";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "./UpdateProduct";

const Navbar = ({
  user,
  setUser,
  setKey,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser({ value: null });
    setKey(Math.random());
    setDropdown(!dropdown);
    router.push("/");
    toast.success("See you soon!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="sticky top-0 bg-white z-10">
      <header className="text-gray-600 body-font shadow-md">
        <div className="container flex p-4 flex-wrap items-center justify-between">
          <Link
            className="flex title-font font-medium items-center text-gray-900"
            href={"/"}
          >
            <span className="ml-3 text-xl cursor-pointer">BookStore</span>
          </Link>
          {!router.pathname.includes("/admin") && (
            <div className="md:order-2 justify-self-end btns flex space-x-2 items-center">
              {user.value ? (
                <MdAccountCircle
                  onMouseEnter={(e) => {
                    setDropdown(!dropdown);
                  }}
                  className="text-3xl cursor-pointer"
                />
              ) : (
                <Link href={"/login"}>
                  <button className="py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded">
                    Login
                  </button>
                </Link>
              )}
              {dropdown && (
                <div
                  onMouseLeave={(e) => {
                    setDropdown(!dropdown);
                  }}
                  className="dropdown absolute rounded border-2 w-48 right-20 top-12 bg-white shadow-lg"
                >
                  <div className=" flex flex-col text-sm">
                    <Link
                      href={"/about"}
                      className="py-2 px-4 hover:bg-gray-200"
                    >
                      My account
                    </Link>
                    <Link
                      href={"/orders"}
                      className="py-2 px-4 hover:bg-gray-200"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-start"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              <button
                className="inline-flex items-center border-0 py-1 px-3 focus:outline-none bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => {
                  setIsCartOpen(isCartOpen ? false : true);
                }}
              >
                <BiCartAlt className="text-2xl " />
              </button>
            </div>
          )}
          {!router.pathname.includes("/admin") && (
            <nav className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-wrap space-x-7 md:space-x-12 lg:space-x-14 items-center text-base justify-center">
              <Link href={"/tshirts"} className=" hover:text-gray-900">
                Business
              </Link>
              <Link href={"/hoodies"} className=" hover:text-gray-900">
                Finance
              </Link>
              <Link href={"/mugs"} className=" hover:text-gray-900">
                Novel
              </Link>
              <Link href={"/stickers"} className=" hover:text-gray-900">
                Drama
              </Link>
            </nav>
          )}
        </div>
      </header>

      <div
        className={` sidebar flex flex-col space-y-5 overflow-y-scroll absolute top-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-slate-50 h-screen p-5 md:p-10 shadow-2xl transition-transform ease-in-out duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header
          className={` cart w-full flex justify-between text-lg lg:text-xl`}
        >
          <span>Your Cart</span>
          <AiFillCloseCircle
            className="lg:text-3xl cursor-pointer"
            onClick={() => setIsCartOpen(isCartOpen ? false : true)}
          />
        </header>

        <div className="items ">
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
            <span>₹{subTotal}</span>
          </div>
          <div className="Shipping flex justify-between w-full">
            <span>Shipping</span>
            <span>₹40</span>
          </div>
          <div className="taxes flex justify-between w-full">
            <span>Taxes (GST)</span>
            <span>₹69</span>
          </div>
          <div className="divider w-full h-0.5 bg-gray-200"></div>
          <div className="Total flex justify-between w-full">
            <span>Total</span>
            <span>₹{subTotal + 40 + 69}</span>
          </div>
        </div>

        <div className="btns w-full flex justify-between space-x-2">
          <button
            type="submit"
            onClick={clearCart}
            className="px-4 py-2 w-1/2 hover:bg-slate-500 hover:text-white text-slate-900 rounded"
          >
            Clear cart
          </button>
          {/* <button
            type="submit"
            className="px-4 py-2 w-1/2 bg-slate-800 hover:bg-slate-700 text-white rounded"
          > */}
          <Link
            href={"/checkout"}
            className="px-4 py-2 w-1/2 bg-slate-800 hover:bg-slate-700 text-white rounded text-center"
            onClick={() => {
              setIsCartOpen(false);
            }}
          >
            Checkout
          </Link>
          {/* </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
