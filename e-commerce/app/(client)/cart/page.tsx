// "use client";

// import Loading from "@/components/Loading";
// import useCartStore from "@/store";
// import React, { useEffect, useState } from "react";
// import { useAuth, useUser } from "@clerk/nextjs";
// import Container from "@/components/Container";
// import NoAccessToCart from "@/components/NoAccessToCart";
// import EmptyCart from "@/components/EmptyCart";
// import { ShoppingBag } from "lucide-react";

// const CartPage = () => {
//   const [isClient, setIsClient] = useState(false);
//   const { isSignedIn } = useAuth();

//   const {
//     deleteCartProduct,
//     getTotalPrice,
//     getItemCount,
//     getSubTotalPrice,
//     resetCart,
//     getGroupedItems,
//   } = useCartStore();

//   const { user } = useUser();

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <Loading />;
//   }

//   const cartProducts = getGroupedItems();

//   if (!isSignedIn) {
//     // Nëse nuk je i loguar, nuk ke akses në karrocë
//     return (
//       <Container>
//         <NoAccessToCart />
//       </Container>
//     );
//   }

//   // Nëse je i loguar por karroca është bosh
//   if (!cartProducts?.length) {
//     return (
//       <Container>
//         <EmptyCart />
//       </Container>
//     );
//   }

//   // Nëse ke produkte, i shfaq këtu (shembull bazik)
//   return (
//      <div className="bg-gray-50 pb-52 md:pb-10">
//       {isSignedIn ? (
//     <Container>
//      {cartProducts?.length ? (
//       <>
//         <div className="flex items-center gap-2 py-5">
//           <ShoppingBag/>
//           <h1 className="text-2xl font-semibold">Shopping Crat</h1>
//         </div>
//         <div className="grid lg:grid-cols-3 md:gap-8">
//           {/**Prodicts */}
//           <div className="lg:col-span-2 rounded-lg">
//             <div className="border bg-white rounded-md">
//               {cartProducts?.map(({product})=>{
//                 return(
//                   <div key={product?._id} className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5">
//                     {/* <p>{product?.name}</p> */}
//                     <div>
//                       <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
//                             {product?.images && (
//                               <div className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
//                                 <Image
//                                   src={urlFor(product?.images[0]).url()}
//                                   alt="productImage"
//                                   width={500}
//                                   height={500}
//                                   loading="lazy"
//                                   className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
//                                 />
//                               </div>
//                             )}
//                     </div>
//                   </div>

//                 )
//               })}
//             </div>
//           </div>
//               {/**summary */}
//               <div className="lg:col-span-1">
//                 <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
//                    <h2 className="text-xl font-semibold mb-4">
//                     Order Summary
//                   </h2>
//                 </div>
//               </div>
//         </div>

//         {/**/}
//       </>
//      ) : (
//       <EmptyCart/>
//      )}
//     </Container>
//      ) : (
//       <NoAccessToCart />
//      )}
//      </div>

//   );
// };

// export default CartPage;
"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import useCartStore from "@/store";
import { Heart, ShoppingBag, Trash } from "lucide-react";

// Funksioni urlFor për imazhet nga Sanity
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client"; // Zëvendëso sipas vendndodhjes reale të klientit të Sanity
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

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
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };
  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  // Nëse je i loguar por karroca është bosh
  if (!cartProducts?.length) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      <Container>
        <div className="flex items-center gap-2 py-5">
          <ShoppingBag />
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 md:gap-8">
          {/* Lista e Produkteve */}
          <div className="lg:col-span-2 rounded-lg">
            <div className="border bg-white rounded-md">
              {cartProducts.map(({ product }) => {
                const itemCount = getItemCount(product?._id);

                return (
                  <div
                    key={product?._id}
                    className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-2 h-36 md:h-44">
                      {product?.images && (
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                        >
                          <Image
                            src={urlFor(product?.images[0]).url()}
                            alt="productImage"
                            width={500}
                            height={500}
                            loading="lazy"
                            className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                          />
                        </Link>
                      )}
                      <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                        <div className="space-y-1.5">
                          <h2 className="font-semibold">{product?.name}</h2>
                          <h2 className="text-sm text-lightColor font-medium">
                            {product?.intro}
                          </h2>
                          <p className="text-sm capitalize">
                            Variant:{" "}
                            <span className="font-semibold">
                              {product.variant}
                            </span>
                          </p>
                          <p className="text-sm capitalize">
                            Status:{" "}
                            <span className="font-semibold">
                              {product?.status}
                            </span>
                          </p>
                        </div>
                        <div className="text-gray-500 flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                              </TooltipTrigger>
                              <TooltipContent className="font-bold">
                                Add to Favorite
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger>
                                <Trash
                                  onClick={() =>
                                    handleDeleteProduct(product?._id)
                                  }
                                  className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                />
                              </TooltipTrigger>
                              <TooltipContent className="font-bold bg-red-600">
                                Delete product
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                     <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                        <PriceFormatter
                          amount={(product?.price as number) * itemCount}
                          className="font-bold text-lg"
                        />
                        <QuantityButtons product={product} />
                      </div>
                  </div>
                );
              })}
               <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                </Button>
            </div>
          </div>

          {/* Përmbledhja e Porosisë */}
          <div className="lg:col-span-1">
            <div className="w-full bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between py-2">
                <span>Items:</span>
                {/* <span>{getItemCount()}</span> */}
              </div>
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>${getSubTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
