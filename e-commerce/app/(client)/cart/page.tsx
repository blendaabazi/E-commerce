"use client";

import Loading from "@/components/Loading";
import useCartStore from "@/store";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();

  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();

  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const cartProducts = getGroupedItems();

  if (!isSignedIn) {
    // Nëse nuk je i loguar, nuk ke akses në karrocë
    return (
      <Container>
        <NoAccessToCart />
      </Container>
    );
  }

  // Nëse je i loguar por karroca është bosh
  if (!cartProducts?.length) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  // Nëse ke produkte, i shfaq këtu (shembull bazik)
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartProducts.map((product) => (
          <li key={product.product._id} className="mb-2">
            <div>{product.product.name}</div>
            <div>Quantity: {product.quantity}</div>
            <div>Price: ${product.product.price}</div>
            {/* <button onClick={() => deleteCartProduct(product.id)}>Remove</button> */}
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold">
        Total: ${getTotalPrice()}
      </div>
    </Container>
  );
};

export default CartPage;
