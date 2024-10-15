import React from "react";
import "./Cart.scss";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
export default function Cart() {
  const DELIVERY_PRICE = 10;

  const { state } = useLocation();

  const cart = [
    {
      id: 1,
      name: "Ticket 1",
      image:
        "https://www.cepsa.com/stfls/comercial/IMAGENES/codlplay-cabecera-PE.jpg",
      price: 100,
      quantity: 2,
    },
  ];

  const getSubtotal = () => {
    const { subTotal } = cart.reduce(
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
                <p>{item.quantity * item.price}</p>
                <p>{item.iD_CustomerNavigation.name}</p>
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
              <p>{getSubtotal()}</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Delivery Fee </p>
              <p>{DELIVERY_PRICE}</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Total </p>
              <p>{getSubtotal() + DELIVERY_PRICE}</p>
            </div>
          </div>
          <Button
            type="primary"
            className="cart__btn"
            style={{ backgroundColor: "#1976d2" }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
}
