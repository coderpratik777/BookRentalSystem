import Link from "next/link";
import React, { useEffect } from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";

const Mugs = ({ mugs }) => {

  return (
    <div className="p-3 lg:p-12 bg-slate-100 min-h-screen">
      <div className="flex flex-wrap w-full">
        {Object.keys(mugs).length == 0 && (
          <p>No Mugs in Stock. Will be comming soon. Stay Tuned!!</p>
        )}
        {Object.keys(mugs).map((item) => {
          return (
            <Link
              key={mugs[item].slug}
              href={`/product/${mugs[item].slug}`}
              className="lg:w-[23.5%] md:w-1/2 m-2 bg-white p-4 w-full shadow hover:shadow-lg rounded"
            >
              <div className="w-full h-64 flex justify-center">
                <img
                  alt="ecommerce"
                  className="h-full rounded"
                  src={mugs[item].img}
                />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {mugs[item].category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {mugs[item].title}
                </h2>
                <div className="sizes flex space-x-1">
                  {mugs[item].size !== "" &&
                    mugs[item].size.map((e) => {
                      return (
                        <div
                          className="size border border-gray-400 px-1"
                          key={e}
                        >
                          {e}
                        </div>
                      );
                    })}
                </div>
                <div className="colors flex space-x-1">
                  {mugs[item].color !== "" &&
                    mugs[item].color.map((e) => {
                      return (
                        <button
                          key={e}
                          style={{ backgroundColor: e }}
                          className={`border border-gray-500 rounded-full w-6 h-6 focus:outline-none`}
                        ></button>
                      );
                    })}
                </div>
                <p className="mt-1">
                  ₹{mugs[item].price} <span className="line-through">₹999</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.URL);
  }
  let products = await Product.find({ category: "mug" });

  let mugs = {};

  for (let item of products) {
    if (item.title in mugs) {
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color];
      } else {
        mugs[item.title].color = [];
      }
      mugs[item.title].size = [];
    }
  }

  return {
    props: { mugs: JSON.parse(JSON.stringify(mugs)) },
  };
}

export default Mugs;
