import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdAccountCircle, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  const router = useRouter();

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:3000/api/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("userToken")).token,
      }),
    });

    const responseData = await response.json();
    setUserData(responseData.user);
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      router.push("/");
    }
    fetchUserData();
  }, []);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });

  const [editBasicEnable, setEditBasicEnable] = useState(false);

  return (
    <div className="py-4 px-36 flex bg-slate-100 space-x-4 min-h-screen">
      <div className="left w-1/5">
        <div className="hello flex shadow bg-white p-2 space-x-2">
          <MdAccountCircle className="text-5xl text-indigo-500" />
          <div className="name">
            <div className="text-gray-500 text-sm">Hello,</div>
            <div>{userData.name}</div>
          </div>
        </div>
      </div>
      <div className="right w-4/5 bg-white p-5 shadow">
        <div className="flex items-center mb-2">
          <div className="text-xl font-bold text-center md:text-left">
            Basic Details
          </div>
          <div
            className="flex ml-3 text-indigo-500 h-full items-center hover:cursor-pointer"
            onClick={() => {
              setEditBasicEnable(true);
            }}
          >
            <span>Edit</span>
            <MdModeEditOutline className="text-lg" />
          </div>
        </div>
        <form
          action="#"
          className="flex flex-wrap -m-2 items-center"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch(
              "http://localhost:3000/api/basicUpdateUser",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: userData.name,
                  email: userData.email,
                  phone: userData.phone,
                  gender: userData.gender,
                }),
              }
            );
            const resData = await response.json();

            if (resData.success) {
              toast.success(`Details updated.`, {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              });
              fetchUserData();
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
          }}
        >
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                  editBasicEnable
                    ? "cursor-text text-gray-900 bg-gray-100 focus:bg-white"
                    : "cursor-not-allowed text-gray-600 bg-gray-300 focus:bg-gray-200"
                }`}
                value={userData.name}
                readOnly={!editBasicEnable}
                onChange={(e) => {
                  setUserData((preValues) => {
                    return { ...preValues, name: e.target.value };
                  });
                }}
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
                className={`w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-not-allowed text-gray-600 bg-gray-300 focus:bg-gray-200`}
              />
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
                readOnly={!editBasicEnable}
                maxLength={10}
                onChange={(e) => {
                  setUserData((preValues) => {
                    return { ...preValues, phone: e.target.value };
                  });
                }}
                className={`w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                  editBasicEnable
                    ? "cursor-text text-gray-900 bg-gray-100 focus:bg-white"
                    : "cursor-not-allowed text-gray-600 bg-gray-300 focus:bg-gray-200"
                }`}
              />
            </div>
          </div>
          <div className="p-2 flex flex-col">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Gender
            </label>
            <label
              className={`relative inline-flex items-center mt-2 ${
                editBasicEnable ? "cursor-default" : "cursor-not-allowed"
              }`}
            >
              <input
                type="checkbox"
                value=""
                className="sr-only peer "
                checked={userData.gender}
                disabled={!editBasicEnable}
                onChange={(e) => {
                  setUserData((preValues) => {
                    return { ...preValues, gender: !userData.gender };
                  });
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {userData.gender ? "Male" : "Female"}
              </span>
            </label>
          </div>
          <div className="ml-auto self-end mb-2 mr-2 space-x-2">
            <button
              className={`px-4 py-2 hover:text-red-500 ease-in-out rounded w-max h-max ${
                editBasicEnable ? "visible" : "hidden"
              }`}
              type="button"
              onClick={(e) => {
                fetchUserData();
                setEditBasicEnable(false);
              }}
            >
              cancel
            </button>
            <button
              className={`px-4 py-2 bg-indigo-500 rounded w-max h-max text-white ${
                editBasicEnable ? "visible" : "hidden"
              }`}
              type="submit"
              onClick={() => {
                setEditBasicEnable(false);
              }}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="p-2 w-full mt-8 border-t border-gray-200 text-center"></div>

        <div className="text-xl font-bold mb-4 text-center md:text-left">
          Change Password
        </div>
        <form
          className="flex flex-wrap -m-2"
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
                "http://localhost:3000/api/passwordUpdate",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: JSON.parse(localStorage.getItem("userToken")).email,
                    password: e.target.password.value.trim(),
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
                fetchUserData();
                e.target.password.value = "";
                e.target.cpassword.value = "";
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
          <div className="p-2 w-5/12">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              required
              autoComplete="on"
            />
          </div>
          <div className="p-2 w-5/12">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
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
          <div className="p-2 w-2/12 flex justify-end items-end">
            <button
              type="submit"
              className={`px-4 py-2 bg-indigo-500 rounded w-full h-max text-white`}
            >
              Update
            </button>
          </div>
        </form>

        <div className="p-2 w-full mt-8 border-t border-gray-200 text-center"></div>

        <div className="text-xl font-bold mb-4 text-center md:text-left">
          Your Address
        </div>
      </div>
    </div>
  );
};

export default About;
