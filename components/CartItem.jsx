import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CartItem = (props) => {
  return (
    <div className="p-2 flex items-center shadow-md bg-white my-2">
      <Link
        href={`/product/${props.itemCode}`}
        className="img w-36 h-36 aspect-square flex justify-between items-center"
      >
        <img className="h-full rounded" src={props.img} />
      </Link>
      <div className="right p-2 flex flex-col space-y-2">
        <div className="name&desc flex flex-col">
          <span className="name text-md">{props.title}</span>
          <span className="description text-gray-400">
            {props.category + " (" + props.color + " / " + props.size + ")"}
          </span>
        </div>
        <div className="price">₹{props.price}</div>
        <div className="quantityManager flex items-center space-x-2">
          <AiFillMinusCircle
            onClick={() => {
              props.removeFromCart(props.itemCode, 1);
            }}
            className="text-xl cursor-pointer"
          />
          <div className="quantity">{props.quantity}</div>
          <AiFillPlusCircle
            onClick={() => {
              props.addToCart(
                props.itemCode,
                1,
                props.price,
                props.title,
                props.size,
                props.color,
                props.category,
                props.img,
                props.desc
              );
            }}
            className="text-xl cursor-pointer"
          />
          <MdOutlineDeleteOutline
            onClick={() => {
              props.removeFromCart(props.itemCode, props.quantity);
            }}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
