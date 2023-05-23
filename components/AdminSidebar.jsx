import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { BsDatabaseAdd, BsBoxes } from "react-icons/bs";
import { BiCartAlt } from "react-icons/bi";

const AdminSidebar = () => {
  const router = useRouter();
  return (
    <nav className="w-1/5 h-screen fixed left-0 top-15 shadow-xl bg-white z-10 flex flex-col p-2">
      <Link
        href="/admin"
        className={`py-4 px-8 rounded flex items-center ${
          router.pathname === "/admin" ? "bg-indigo-400 text-white hover:bg-indigo-400":"hover:bg-indigo-200"
        }`}
      >
        <RxDashboard className="text-xl" />
        <span className="ml-2">Dashboard</span>
      </Link>
      <Link
        href="/admin/allProducts"
        className={`py-4 px-8 rounded  flex items-center ${
          router.pathname === "/admin/allProducts" ? "bg-indigo-400 text-white hover:bg-indigo-400":"hover:bg-indigo-200"
        }`}
      >
        <BsBoxes className="text-xl" />
        <span className="ml-2">View Products</span>
      </Link>
      <Link
        href="/admin/addProduct"
        className={`py-4 px-8 rounded flex items-center ${
          router.pathname === "/admin/addProduct" ? "bg-indigo-400 text-white hover:bg-indigo-400":"hover:bg-indigo-200"
        }`}
      >
        <BsDatabaseAdd className="text-xl" />
        <span className="ml-2">Add Products</span>
      </Link>
      <Link
        href="/admin/viewOrders"
        className={`py-4 px-8 rounded flex items-center ${
          router.pathname === "/admin/viewOrders" ? "bg-indigo-400 text-white hover:bg-indigo-400":"hover:bg-indigo-200"
        }`}
      >
        <BiCartAlt className="text-xl" />
        <span className="ml-2">View Orders</span>
      </Link>
    </nav>
  );
};

export default AdminSidebar;
