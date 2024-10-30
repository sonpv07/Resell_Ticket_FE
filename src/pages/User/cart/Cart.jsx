import React, { useContext, useState } from "react";
import "./Cart.scss";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import OrderService from "../../../services/order.service";
import { AuthContext } from "../../../context/AuthContext";
import { PAYMENT_METHODS } from "../../../configs/constant";
import TransactionService from "../../../services/transaction.service";
import { toast } from "react-toastify";
import { currencyFormatter } from "../../../utils";
export default function Cart() {
  const DELIVERY_PRICE = 0;

  const { state } = useLocation();

  console.log(state);

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const getSubtotal = () => {
    const { subTotal } = state.ticket.reduce(
      (acc, item) => {
        acc.subTotal += item.quantity * item.price;

        return acc;
      },
      { subTotal: 0 }
    );

    return subTotal;
  };

  const handleCreateOrder = async () => {
    setLoading(true);

    if (!state.order) {
      let body = {
        iD_Customer: user.iD_Customer,
        payment_method: PAYMENT_METHODS.VNPAY,
        totalPrice: getSubtotal() + DELIVERY_PRICE,
        ticketItems: [
          {
            iD_Ticket: state.ticket[0].id,
            quantity: state.ticket[0].quantity,
          },
        ],
      };

      const response = await OrderService.createOrder(body);

      if (response.success) {
        let paymentBody = {
          iD_Order: response.data.orderId,
          transaction_Type: "Ticket",
          iD_Customer: user.iD_Customer,
          iD_Payment: 1,
          finalPrice: getSubtotal() + DELIVERY_PRICE,
        };

        const paymentResponse = await TransactionService.createPayment(
          paymentBody
        );

        if (paymentResponse.success) {
          setLoading(false);
          window.open(paymentResponse.data.url);
        }
      } else {
        setLoading(false);
        toast.error("Error creating order");
      }
    } else {
      console.log("Have Order");

      let paymentBody = {
        iD_Order: state?.order?.iD_Order,
        transaction_Type: "Ticket",
        iD_Customer: user?.iD_Customer,
        iD_Payment: 1,
        finalPrice: getSubtotal() + DELIVERY_PRICE,
      };

      const paymentResponse = await TransactionService.createPayment(
        paymentBody
      );

      if (paymentResponse.success) {
        setLoading(false);
        window.open(paymentResponse.data.url);
      }
    }
  };

  if (!state) {
    return <h1 className="null">Nothing to checkout</h1>;
  } else if (
    state.order &&
    state?.order?.status.toUpperCase() !== "Pending".toUpperCase()
  ) {
    return <h1 className="null">This order is already completed</h1>;
  }

  return (
    <div className="cart">
      <div className="cart__items">
        <div className="cart__items__title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Seller</p>
        </div>

        <br />
        <hr />

        {state.ticket.map((item) => {
          return (
            <div>
              <div className="cart__items__title cart__items__item">
                <img src={item.image} alt={item.show_Name} />
                <p>{item.show_Name}</p>
                <p>{currencyFormatter(item.price)}</p>
                <p>{item.quantity}</p>
                <p>{currencyFormatter(item.quantity * item.price)} </p>
                <p>{item.seller}</p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>

      <div className="cart__bottom">
        <div className="cart__total">
          <h2>Total</h2>
          <div>
            <div className="cart__total__detail">
              <p>Subtotal </p>
              <p>{currencyFormatter(getSubtotal())}</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Delivery Fee </p>
              <p>{currencyFormatter(DELIVERY_PRICE)}</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Total </p>
              <p>{currencyFormatter(getSubtotal() + DELIVERY_PRICE)}</p>
            </div>
          </div>
          <Button
            type="primary"
            className="cart__btn"
            style={{ backgroundColor: "#1976d2" }}
            onClick={handleCreateOrder}
            loading={loading}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
}
