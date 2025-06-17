// import type { Metadata } from "next";
// import "../globals.css";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import {ClerkProvider} from '@clerk/nextjs'
// import localFont from 'next/font/local';
// import { Toaster } from "react-hot-toast";

// const raleway = localFont({
//   src: "../fonts/Raleway.woff2",
//   variable: "--font-raleway",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Ecommerce app for shoppers",
//   description: "An Ecommmerce app for education purposes",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//     <html lang="en">
//       <body
//         className={`${raleway.variable} ${raleway.variable} antialiased`}
//       >
//         <Header />
//         {children}
//         <Footer />
//         <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: "#000000",
//             color: "#ffffff",
//           },
//         }}
//         />
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }
// app/layout.tsx ose app/(client)/layout.tsx

import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { UserRoleProvider } from "@/context/UserRoleContext"; //  importo context-in

const raleway = localFont({
  src: "../fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommerce app for shoppers",
  description: "An Ecommmerce app for education purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <UserRoleProvider> {/* wrap për context API */}
        <html lang="en">
          <body className={`${raleway.variable} antialiased`}>
            <Header />
            {children}
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#000000",
                  color: "#ffffff",
                },
              }}
            />
          </body>
        </html>
      </UserRoleProvider>
    </ClerkProvider>
  );
}
