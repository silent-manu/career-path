import { useContext } from "react";

import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import CartContext from "../store/CartContext.jsx";

import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userCtx.hideCart();
  }

  function handleGoToCheckout() {
    userCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      {cartCtx.items.length === 0 && <p>Please add items to your cart!</p>}
      {cartCtx.items.length > 0 && (
        <ul>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          ))}
        </ul>
      )}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
