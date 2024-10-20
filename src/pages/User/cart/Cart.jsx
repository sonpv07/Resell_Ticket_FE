import React, { useContext } from "react";
import "./Cart.scss";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import OrderService from "../../../services/order.service";
import { AuthContext } from "../../../context/AuthContext";
import { PAYMENT_METHODS } from "../../../configs/constant";
import TransactionService from "../../../services/transaction.service";
import { toast } from "react-toastify";
export default function Cart() {
  const DELIVERY_PRICE = 10;

  const { state } = useLocation();

  const { user } = useContext(AuthContext);

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

  if (!state) {
    return <h1 className="null">Nothing to checkout</h1>;
  }

  const handleCreateOrder = async () => {
    let body = {
      iD_Customer: user.iD_Customer,
      payment_method: PAYMENT_METHODS.VNPAY,
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
        iD_Order: 21,
        iD_Customer: user.iD_Customer,
        iD_Payment: 1,
        finalPrice: getSubtotal() + DELIVERY_PRICE,
      };

      const paymentResponse = await TransactionService.createPayment(
        paymentBody
      );

      if (paymentResponse.success) {
        window.open(paymentResponse.data.url);
      }
    } else {
      toast.error("Error creating order");
    }
  };

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
                <p>{item.price} $</p>
                <p>{item.quantity}</p>
                <p>{item.quantity * item.price} $</p>
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
              <p>{getSubtotal()} $</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Delivery Fee </p>
              <p>{DELIVERY_PRICE} $</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Total </p>
              <p>{getSubtotal() + DELIVERY_PRICE} $</p>
            </div>
          </div>
          <Button
            type="primary"
            className="cart__btn"
            style={{ backgroundColor: "#1976d2" }}
            onClick={handleCreateOrder}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
}
