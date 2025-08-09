"use client";
import LeftContent from "@/components/UIUX/LeftContet/LeftContent";
import RightBar from "@/components/UIUX/RightBar/RightBar";
import SearchBar from "@/components/UIUX/SearchBar/SearchBar";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import PaymentScreen from "@/app/PaymentScreen/page";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleProductSelected = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id); // Use SQLite's unique id
      return exists
        ? prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
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
            <RightBar
              items={items}
              onPaymentClick={() => setShowPaymentScreen(true)}
            />
          </div>
        </div>
      )}
    </>
  );
}
