import React, { useEffect, useState } from "react";
import CartItem from "../components/Common/CartItem";
import { fetchCarts } from "../reducks/carts/operations";
import { fetchItems } from "../reducks/items/operations";
import { getCarts } from "../reducks/carts/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reducks/users/selectors";
import { getItems } from "../reducks/items/selectors";
import MainImage from "../components/Common/MainImage";

const Cart = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const carts = getCarts(selector);
  const user = getUser(selector);
  const items = getItems(selector);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCarts());
  }, []);

  return (
    <>
      <MainImage />
      <section class="main">
        <div class="cart-list">
          {
            (carts,
            items &&
              carts.map((cart) => (
                <div class="cart-item">
                  <CartItem
                    cart={cart.item}
                    cartId={cart.id}
                    key={cart.item.id}
                    quantity={cart.quantity}
                  />
                </div>
              )))
          }
        </div>
      </section>
    </>
  );
};

export default Cart;
