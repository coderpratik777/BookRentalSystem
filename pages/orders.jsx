import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Orders = () => {
  const router = useRouter();

  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("userToken")).token,
      }),
    });

    const responseData = await response.json();
    setOrders(responseData.orders);
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      router.push("/");
    }
    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex justify-center w-full py-16">
        <span className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Manage Your Orders
        </span>
      </div>
      <div className="orders w-full px-24 pb-5">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tl rounded-bl">
                Order Id
              </th>
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                Date
              </th>
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                Payment Type
              </th>
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                Total
              </th>
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm">
                Status
              </th>
              <th className="p-3 title-font tracking-wider font-medium border-gray-300 border-y text-gray-900 text-sm rounded-tr rounded-br">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr className="hover:bg-gray-100 border-gray-300 border-y">
                  <td className="p-3 w-1/6">{order.orderId}</td>
                  <td className="p-3 w-1/6">{order.updatedAt.slice(0, 10)}</td>
                  <td className="p-3 w-1/6">{order.paymentInfo.method}</td>
                  <td className="p-3 w-1/6">Rs {order.amount}</td>
                  <td className="p-3 w-1/6">{order.deliveryStatus}</td>
                  <td className="p-3 w-1/6 text-blue-600 underline">
                    <Link href={`/orderDetail?id=${order.orderId}`}>
                      click here
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
