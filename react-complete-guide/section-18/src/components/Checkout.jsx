import { useContext } from "react";

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Input from "./ui/Input.jsx";
import Button from "./ui/Button.jsx";
import Modal from "./ui/Modal.jsx";

import { currencyFormatter } from "../util/formatting.js";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleCloseModal() {
    userCtx.hideCheckout();
  }

  function handleFinishOrder() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const actions = !isSending ? (
    <>
      <Button textOnly onClick={handleCloseModal}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  ) : (
    <span>Sending order data...</span>
  );

  if (data && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleFinishOrder}>
        <h2>Success!</h2>
        <p>Your order was submitted succesfully.</p>
        <p>
          We will get back to you with more details via email within the necxt
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinishOrder}>OK</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleCloseModal}>
      <form onSubmit={handleSubmitForm}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
