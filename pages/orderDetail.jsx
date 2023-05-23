import React, { useEffect } from "react";
import mongoose from "mongoose";
import Order from "@/models/Order";

const OrderDetail = ({ order }) => {
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      router.push("/");
    }
  }, []);
  return (
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-2/3 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                DevelopersWear
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Order has been placed successfully.
              </p>
              <table className="w-full text-left mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tl rounded-bl">
                      Description
                    </th>
                    <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                      Quantity
                    </th>
                    <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                      Item Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(order.products).map((key) => {
                    return (
                      <tr key={key} className="hover:bg-gray-100">
                        <td className="p-3 border-gray-200 border-y w-1/3">
                          <div className="name&desc flex flex-col">
                            <span className="name text-md">
                              {order.products[key].title}
                            </span>
                            <span className="description text-gray-400">
                              {order.products[key].category +
                                " (" +
                                order.products[key].color +
                                " / " +
                                order.products[key].size +
                                ")"}
                            </span>
                          </div>
                          <div className="price">
                            ₹{order.products[key].price}
                          </div>
                        </td>
                        <td className="p-3 border-gray-200 border-y w-1/3">
                          {order.products[key].qty}
                        </td>
                        <td className="p-3 border-gray-200 border-y w-1/3">
                          {order.products[key].price * order.products[key].qty}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal: Rs. {order.amount}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Contact Details</span>
                <span>{order.name}</span>
                <span>{order.email}</span>
                <span>{order.address}</span>
                <span>
                  {order.pincode},{order.city},{order.state}
                </span>
              </div>
            </div>
            <div className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded bg-gray-500" />
          </div>
        </div>
      </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.URL);
  }
  let order = await Order.findOne({ orderId: context.query.id });
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default OrderDetail;
