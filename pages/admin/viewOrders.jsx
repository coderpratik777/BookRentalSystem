import AdminSidebar from "@/components/AdminSidebar";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import Order from "@/models/Order";
import Link from "next/link";

const ViewOrders = ({ orders }) => {
//   useEffect(() => {
//     console.log(orders);
//   }, []);

  return (
    <div className="flex justify-end bg-slate-100">
      <AdminSidebar />
      <div className="flex flex-col w-4/5 p-8">
        <h1 className="text-2xl font-bold mb-4">Orders Placed</h1>
        <div className="orders w-full">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tl rounded-bl">
                  Order Id
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  user email
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  City
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Date
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Products
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br">
                  amount
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Payment Mode
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                  Delivery Status
                </th>
                <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr
                    className="hover:bg-gray-100 border-gray-300 border-y"
                    key={order.orderId}
                  >
                    <td className="p-3 w-2/12">{order.orderId}</td>
                    <td className="p-3 w-3/12">{order.email}</td>
                    <td className="p-3 w-1/12">{order.city}</td>
                    <td className="p-3 w-2/12">
                      {order.updatedAt.slice(0, 10)}
                    </td>
                    <td className="p-3 w-1/12">
                      {Object.keys(order.products).length}
                    </td>
                    <td className="p-3 w-1/12">Rs {order.amount}</td>
                    <td className="p-3 w-1/12">{order.paymentInfo.method}</td>
                    <td className="p-3 w-1/12">{order.deliveryStatus}</td>
                    <td className="p-3 w-1/12">
                      <Link href={`/orderDetail?id=${order.orderId}`} className="text-blue-500 underline">
                        here
                      </Link>
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
  let orders = await Order.find();

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}

export default ViewOrders;
