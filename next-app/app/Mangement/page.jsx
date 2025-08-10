"use client";
import { useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import DashboardPage from "../Dashboard/page";
import ProductsPage from "../products/page";
import AddProductPage from "../add-product/page";

export default function Management() {
  const [activePage, setActivePage] = useState("home");
  const router = useRouter();
  
 

  const renderContent = () => {
    switch (activePage) {
     case "add-product":
        return <div className="p-5"><AddProductPage/></div>;
     case "dashboard":
        return <div className="p-5"><DashboardPage /></div>;
     case "home":
        return <div className="p-5">🏠 Welcome to the Home Page</div>;
     case "products":
        return <div className="p-5"><ProductsPage /></div>;
     case "settings":
        return <div className="p-5">⚙️ Settings Page</div>;
    default:
        return <div className="p-5">Select a page from the left</div>;
    }
  };

  return (
    
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <button onClick={() => router.back()} className="text-white m-2 p-2 rounded w-fit h-fit bg-gray-700 hover:bg-gray-600"
        >
            <FaBackward/>
      </button>
      {/* Left Menu */}
        <div className="flex flex-row h-full w-full">
            <div className="w-1/6 bg-gray-800 border-1 rounded-sm border-gray-700 p-4 space-y-3">
                <button
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                    activePage === "home" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("home")}
                >
                Home
                </button>

                <button
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                    activePage === "products" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("products")}
                >
                Products
                </button>

                <button
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                    activePage === "sales" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("dashboard")}
                >
                Dashboard
                </button>

                <button
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${
                    activePage === "settings" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActivePage("settings")}
                >
                Settings
                </button>
            </div>
            {/* Right Content */}
            <div className="flex-1">{renderContent()}</div>
        </div>

      
    </div>
  );
}
