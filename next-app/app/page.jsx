"use client";
import LeftContent from "@/components/UIUX/LeftContet/LeftContent";
import RightBar from "@/components/UIUX/RightBar/RightBar";
import SearchBar from "@/components/UIUX/SearchBar/SearchBar";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import PaymentScreen from "./PaymentScreen/page";



export default function Home() {
  const [items, setItems] = useState([]);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleProductSelected = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.barcode === product.barcode);
      return exists
        ? prev.map((p) =>
            p.barcode === product.barcode
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
   
     
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    

        

        {showPaymentScreen ? (
          <PaymentScreen
            items={items}
            onClose={() => setShowPaymentScreen(false)}
            setItems={setItems}
          />
        ) : (
           <div className="h-screen overflow-hidden">
              <SearchBar onProductSelected={handleProductSelected} />
              <div className="flex w-full h-[94vh]">
                <LeftContent items={items} setItems={setItems} />
                <RightBar onPaymentClick={() => setShowPaymentScreen(true)} />
              </div>
           </div>
        )}
     
    
    </>
  );
}