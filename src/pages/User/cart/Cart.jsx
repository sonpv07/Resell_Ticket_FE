import React from "react";
import "./Cart.scss";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
export default function Cart() {
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

  return (
    <div className="cart">
      <div className="cart__items">
        <div className="cart__items__title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {cart.map((item) => {
          return (
            <div>
              <div className="cart__items__title cart__items__item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <p>{item.quantity * item.price}</p>
                <p className="remove">
                  <DeleteFilled />
                </p>
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
              <p>{0}</p>
            </div>
            <hr />

            <div className="cart__total__detail">
              <p>Total </p>
              <p>{getSubtotal() + 10}</p>
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
