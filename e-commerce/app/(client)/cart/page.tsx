"use client";
import Loading from "@/components/Loading";
import useCartStore from "@/store";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";

const CartPage = () => {
    const [isClient,setIsClient] = useState(false);
    const { isSignedIn } = useAuth();

    const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItems
  } = useCartStore();

   const { user } = useUser();

  
  useEffect(() =>{
        setIsClient(true);
    }, []);
    if(!isClient){
        return <Loading/>

    }
    const cartProducts = getGroupedItems();
    return (
    
    <div>{!isSignedIn? (
        <Container>{!cartProducts?.length?(
             <><p>products</p></>)
             :
             (
                <EmptyCart/>
             )
             }</Container>
    ):(
        <NoAccessToCart/>
    )}
        </div>
    );
};

export default CartPage