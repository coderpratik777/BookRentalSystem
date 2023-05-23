import AdminSidebar from "@/components/AdminSidebar";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    bookName: "",
    authorName: "",
    img: "",
    desc:"",
    category: "",
    publishingYear: "",
    numberOfPages: "",
    price: "",
    availableQty: "",
    rent:""
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      console.log()
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

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-end bg-slate-100">
      <AdminSidebar />
      <main className="p-8 w-4/5 flex flex-wrap">
        <div className="text-2xl font-bold mb-4 w-full">Add Products</div>
        <form
          method="POST"
          className="flex flex-wrap gap-4 w-3/4"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(product)
            let updatedProduct;
            if (product.category === "mug") {
              updatedProduct = { ...product, size: "" };
            }
            if (product.category === "sticker") {
              updatedProduct = { ...product, size: "", color: "" };
            }

            const response = await fetch(
              "http://localhost:3000/api/addproducts",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([
                  {
                    ...updatedProduct,
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
              setProduct({
                bookName: "",
                authorName: "",
                img: "",
                desc:"",
                category: "",
                publishingYear: "",
                numberOfPages: "",
                price: "",
                availableQty: "",
                rent:""
              });
              e.target.reset();
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
          <div className="w-[49%]">
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              id="bookName"
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
              required
              value={product.title}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="w-[49%]">
            <label
              htmlFor="color"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              id="authorName"
              value={product.authorName}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
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
          <div className="w-[24%]">
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Price (in Rupees)
            </label>
            <input
              type="number"
              name="numberOfPages"
              id="numberOfPages"
              value={product.numberOfPages}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="w-[24%]">
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Number Of pages
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
          <div className="w-[24%]">
            <label
              htmlFor="rent"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Rent(per day)
            </label>
            <input
              type="number"
              name="rent"
              id="rent"
              value={product.rent}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="w-[24%]">
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
          <div className="w-[24%]">
            <label
              htmlFor="availableQty"
              className="block mb-1 text-sm font-medium text-gray-900 "
            >
              Publishing Year
            </label>
            <input
              type="number"
              name="publishingYear"
              id="publishingYear"
              value={product.publishingYear}
              className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-gray-900"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="w-[23%]">
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
              <option value="finance">Finance</option>
              <option value="business">Business</option>
              <option value="novel">Novel</option>
              <option value="drama">Drama</option>
              <option value="self-help">Self-help</option>
            </select>
          </div>
          <div className="flex items-center mt-5">
            <label htmlFor="imageUpload">Upload Product Image:</label>
            <input
              type="file"
              id="imageUpload"
              className="px-4 py-2 border border-indigo-500 rounded-lg ml-2"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full flex justify-center mt-3">
            <button
              type="submit"
              className="w-max h-max px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white place-self-end mb-1"
            >
              Add
            </button>
          </div>
        </form>
        <div className="w-1/4 flex justify-center">
          <img
            src={product.img}
            alt=""
            srcSet=""
            className="bg-gray-500 w-64 h-64 rounded border border-gray-600"
          />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
