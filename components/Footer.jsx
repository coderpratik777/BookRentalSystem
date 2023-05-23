import Link from "next/link";
import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 bg-gray-200 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <Link
              href={"/"}
              className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
            >
              <span className="text-2xl">DevelopersWear</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Look like developer</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                T-shirts
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Basic Half sleeve
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Long sleeve crew neck
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Polo collor
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">V neck</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Hoodies
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Zip-up</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Pullover</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Sleeveless
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Flannel Button-Up
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Mugs
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Ceramic</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Glass</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Steel</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Tumblers</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Stickers
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Laptop</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-300">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} DevelopersWear —
              <a
                href="https://github.com/aniket-tote"
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                @anikettote
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <Link
                href={"https://github.com/aniket-tote"}
                className="text-gray-500"
              >
                <AiFillGithub className="text-2xl" />
              </Link>
              <Link
                href={"https://twitter.com/anikettote"}
                className="ml-3 text-gray-500"
              >
                <AiOutlineTwitter className="text-2xl" />
              </Link>
              <Link
                href={"https://www.instagram.com/aniket_.tote"}
                className="ml-3 text-gray-500"
              >
                <AiOutlineInstagram className="text-2xl" />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/aniket-tote-47988a187/"}
                className="ml-3 text-gray-500"
              >
                <AiFillLinkedin className="text-2xl" />
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
