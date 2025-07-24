"use client";
import LeftContent from "@/components/UIUX/LeftContet/LeftContent";
import RightBar from "@/components/UIUX/RightBar/RightBar";
import SearchBar from "@/components/UIUX/SearchBar/SearchBar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [items, setItems] = useState([]);

  const handleProductSelected = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find(p => p.barcode === product.barcode);
      if (existing) {
        return prevItems.map(p =>
          p.barcode === product.barcode
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };


  




  return (
    <div className="h-screen overflow-y-hidden">
      <SearchBar onProductSelected={handleProductSelected} />
      <div className="flex w-full h-[94vh]">
        <LeftContent items={items} setItems={setItems} />
        <RightBar />
      </div>
    </div>
  );
}