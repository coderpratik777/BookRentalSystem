import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = ({ setUpdateActive, updateProduct }) => {
  const [product, setProduct] = useState({
    _id: updateProduct._id,
    title: updateProduct.title,
    slug: updateProduct.slug,
    desc: updateProduct.desc,
    img: updateProduct.img,
    category: updateProduct.category,
    size: updateProduct.size,
    color: updateProduct.color,
    price: updateProduct.price,
    availableQty: updateProduct.availableQty,
  });

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const responseCloudinary = await fetch(
        "https://api.cloudinary.com/v1_1/dkyipn99j/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (responseCloudinary.ok) {
        const data = await responseCloudinary.json();
        const imageUrl = data.secure_url;

        console.log("Image URL:", imageUrl);
        setProduct((prev) => {
          return { ...prev, img: imageUrl };
        });
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="bg-slate-800 opacity-70 w-1/6 min-h-screen cursor-pointer"
        onClick={() => {
          setUpdateActive(false);
        }}
      ></div>
      <div className="w-4/6">
        <div
          className="w-full h-[10vh] bg-slate-800 opacity-70"
          onClick={() => {
            setUpdateActive(false);
          }}
        ></div>
        <div className="w-full bg-white h-[80vh] p-8 overflow-y-auto flex flex-wrap">
          <div className="w-full text-xl text-center font-semibold pb-8">
            Update Details
          </div>
          <form
            method="POST"
            className="w-2/3 flex flex-wrap gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              let updatedProductValues = { ...product };
              if (product.category === "mug") {
                updatedProductValues = { ...product, size: "" };
              }
              if (product.category === "sticker") {
                updatedProductValues = { ...product, size: "", color: "" };
              }

              const response = await fetch(
                "http://localhost:3000/api/updateproduct",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify([
                    {
                      ...updatedProductValues,
                    },
                  ]),
                }
              );

              const responseData = await response.json();
              if (responseData.success) {
                toast.success(`Product Added`, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setUpdateActive(false);
              } else {
                toast.error(responseData.message, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          >
            <div className="w-full">
              <label
                htmlFor="title"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
                required
                value={product.title}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-[48.72%]">
              <label
                htmlFor="price"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Price (in Rupees)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-[48.72%]">
              <label
                htmlFor="availableQty"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Available Quantity
              </label>
              <input
                type="number"
                name="availableQty"
                id="availableQty"
                value={product.availableQty}
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="desc"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                type="text"
                name="desc"
                id="desc"
                rows={5}
                value={product.desc}
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-[34.5%]">
              <label
                htmlFor="color"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                disabled={product.category === "sticker"}
                value={product.category === "sticker" ? "" : product.color}
                className="w-full rounded border border-gray-300 focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={(e) => {
                  handleChange(e);
                }}
                className=" bg-white w-full border border-gray-300 hover:border-indigo-500 px-4 py-2.5 rounded leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="tshirt">Tshirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="mug">Mug</option>
                <option value="sticker">Sticker</option>
              </select>
            </div>
            {(product.category === "tshirt" ||
              product.category === "hoodie") && (
              <div className="w-[30%]">
                <label
                  htmlFor="size"
                  className="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Size
                </label>
                <select
                  name="size"
                  id="size"
                  value={product.size}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className=" bg-white w-full border border-gray-300 hover:border-indigo-500 px-4 py-2.5 rounded leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            )}
            <div className="flex items-center mt-5 w-full">
              <label htmlFor="imageUpload">Update Product Image:</label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="px-4 py-2 w-2/3"
                onChange={handleImageChange}
              />
            </div>

            <div className="w-full flex justify-center mt-3">
              <button
                type="submit"
                className="w-max h-max px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white place-self-end mb-1"
              >
                Update
              </button>
            </div>
          </form>
          <div className="preview w-1/3 flex justify-center">
            <img
              src={product.img}
              alt=""
              srcSet=""
              className="w-64 h-64 rounded border border-gray-500"
            />
          </div>
        </div>
        <div
          className="w-full h-[10vh] bg-slate-800 opacity-70"
          onClick={() => {
            setUpdateActive(false);
          }}
        ></div>
      </div>
      <div
        className="bg-slate-800 w-1/6 opacity-70 min-h-screen cursor-pointer"
        onClick={() => {
          setUpdateActive(false);
        }}
      ></div>
    </div>
  );
};

export default UpdateProduct;
