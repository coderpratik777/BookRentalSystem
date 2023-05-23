import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";

const stickers = ({ stickers }) => {
  return (
    <div className="p-3 lg:p-12 bg-slate-100 min-h-screen">
      <div className="flex flex-wrap w-full">
        {Object.keys(stickers).length == 0 && (
          <p>No Stickers in Stock. Will be comming soon. Stay Tuned!!</p>
        )}
        {Object.keys(stickers).map((item) => {
          return (
            <Link
              key={stickers[item].slug}
              href={`/product/${stickers[item].slug}`}
              className="lg:w-[23.5%] md:w-1/2 m-2 bg-white p-4 w-full shadow hover:shadow-lg rounded"
            >
              <div className="w-full h-64 flex justify-center">
                <img
                  alt="ecommerce"
                  className="h-full rounded"
                  src={stickers[item].img}
                />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {stickers[item].category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {stickers[item].title}
                </h2>
                <div className="sizes flex space-x-1">
                  {stickers[item].size !== "" &&
                    stickers[item].size.map((e) => {
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
                  {stickers[item].color !== "" &&
                    stickers[item].color.map((e) => {
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
                  ₹{stickers[item].price}{" "}
                  <span className="line-through">₹999</span>
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
  let products = await Product.find({ category: "sticker" });

  let stickers = {};

  for (let item of products) {
    if (item.title in stickers) {
      // if (
      //   !stickers[item.title].size.includes(item.size) &&
      //   item.availableQty > 0
      // ) {
      //   stickers[item.title].size.push(item.size);
      // }
      if (
        !stickers[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        stickers[item.title].color.push(item.color);
      }
    } else {
      stickers[item.title] = JSON.parse(JSON.stringify(item));
      stickers[item.title].size = [];
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color];
      } else {
        stickers[item.title].color = [];
      }
    }
  }

  return {
    props: { stickers: JSON.parse(JSON.stringify(stickers)) },
  };
}

export default stickers;
