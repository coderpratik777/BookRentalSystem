import AdminSidebar from "@/components/AdminSidebar";
import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import { AiOutlineEdit, AiFillEdit } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import Product from "@/models/Product";
import UpdateProduct from "@/components/UpdateProduct";

const AllProducts = ({ products }) => {
  const [updateActive, setUpdateActive] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});

  return (
    <div className={`flex justify-end bg-slate-100`}>
      <AdminSidebar />
      {updateActive && (
        <UpdateProduct
          updateActive={updateActive}
          updateProduct={updateProduct}
          setUpdateActive={setUpdateActive}
        />
      )}
      <div className={`flex flex-col w-4/5 p-8`}>
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="orders w-full">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tl rounded-bl">
                  Sr. no.
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Title
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Image
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Category
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Color
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Size
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Price
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br">
                  Available Qty
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br"></th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                return (
                  <tr
                    className="hover:bg-gray-100 border-gray-300 border-y"
                    key={i}
                  >
                    <td className="p-3 w-1/12">{i + 1}</td>
                    <td className="p-3 w-3/12">{product.title}</td>
                    <td className="p-3 w-1/12">
                      <img
                        src={product.img}
                        alt=""
                        srcSet=""
                        className="w-12"
                      />
                    </td>
                    <td className="p-3 w-1/12">{product.category}</td>
                    <td className="p-3 w-1/12">
                      <div
                        style={
                          product.color === ""
                            ? {}
                            : {
                                backgroundColor: product.color,
                              }
                        }
                        className="w-5 h-5 rounded-full border border-black"
                      ></div>
                    </td>
                    <td className="p-3 w-1/12">
                      {product.size === "" ? "default" : product.size}
                    </td>
                    <td className="p-3 w-1/12">Rs {product.price}</td>
                    <td className="p-3 w-1/12">{product.availableQty}</td>
                    <td className="p-3 w-[4.16%]">
                      <AiOutlineEdit
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          setUpdateProduct(product);
                          setUpdateActive(true);
                        }}
                      />
                    </td>
                    <td className="p-3 w-[4.16%]">
                      <BiTrashAlt className="text-xl cursor-pointer" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.URL);
  }
  let products = await Product.find();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default AllProducts;
