import { useContext } from "react";

import logoImg from "../assets/logo.jpg";

import Button from "./ui/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalItemsQuantity, item) => {
    return totalItemsQuantity + item.quantity;
  }, 0);

  function handleShowCart() {
    userCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React FoodOrder</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
