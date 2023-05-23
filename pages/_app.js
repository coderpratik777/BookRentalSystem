import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

    const userToken = JSON.parse(localStorage.getItem("userToken"));
    if (userToken) {
      setUser({ value: userToken });
    }
    setKey(Math.random());
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subT += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subT);
  };

  const addToCart = (
    itemCode,
    qty,
    price,
    title,
    size,
    color,
    category,
    img,
    desc
  ) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = {
        qty: 1,
        price,
        title,
        size,
        color,
        category,
        img,
        desc,
      };
    }
    setCart(newCart);
    saveCart(newCart);

    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const removeFromCart = (itemCode, qty) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
    toast.error("Removed item", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const buyNow = (
    itemCode,
    qty,
    price,
    title,
    size,
    color,
    category,
    img,
    desc
  ) => {
    let newCart = {};
    newCart[itemCode] = {
      qty: 1,
      price,
      title,
      size,
      color,
      category,
      img,
      desc,
    };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    toast.error("Cart cleared!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="">
      <LoadingBar
        color="rgb(99 102 241)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      {key && (
        <Navbar
          key={key}
          progress={progress}
          setProgress={setProgress}
          setKey={setKey}
          setUser={setUser}
          user={user}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
        />
      )}
      <Component
        cart={cart}
        progress={progress}
        setProgress={setProgress}
        setKey={setKey}
        user={user}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      {!router.pathname.includes("/admin") && <Footer />}
    </div>
  );
}
