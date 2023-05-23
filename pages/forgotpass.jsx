import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpass = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      router.push("/");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center px-6 mx-auto md:h-screen py-12 lg:py-24">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight w-full text-center tracking-tight text-gray-900 md:text-2xl ">
              {router.query.token
                ? "Reset Your Password"
                : "Confirm your email"}
            </h1>
            {router.query.token ? (
              <form
                className="flex flex-col"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (e.target.password.value !== e.target.cpassword.value) {
                    toast.warning("Passwords do not match", {
                      position: "top-center",
                      autoClose: 2000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                    });
                  } else {
                    const response = await fetch(
                      "http://localhost:3000/api/resetpassword",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: e.target.email.value.trim(),
                          password: e.target.password.value.trim(),
                          token: router.query.token,
                          reqTime: new Date().toISOString(),
                        }),
                      }
                    );
                    const resData = await response.json();

                    if (resData.success) {
                      toast.success(`Password updated.`, {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                      });
                      router.push("/login");
                    } else {
                      toast.error(resData.message, {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                      });
                    }
                  }
                }}
              >
                <div className="py-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={router.query.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="py-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required
                    autoComplete="on"
                  />
                </div>
                <div className="py-2">
                  <label
                    htmlFor="cpassword"
                    className="leading-7 text-sm text-gray-600 font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    autoComplete="on"
                  />
                </div>
                <div className="py-2">
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded w-full h-max text-white font-semibold`}
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={async (e) => {
                  setIsLoading(true);
                  e.preventDefault();
                  const response = await fetch(
                    "http://localhost:3000/api/forgotPassword",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email: e.target.email.value,
                      }),
                    }
                  );

                  const resData = await response.json();

                  if (resData.success) {
                    e.target.email.value = "";
                    toast.success("Mail sent!", {
                      position: "top-center",
                      autoClose: 2000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                    });
                  } else {
                    toast.error(resData.message, {
                      position: "top-center",
                      autoClose: 2000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "light",
                    });
                  }
                  setIsLoading(false);
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center"
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Get link to reset password"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgotpass;
