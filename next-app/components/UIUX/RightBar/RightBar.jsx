'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMoneyBillWave } from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';
import Menu from "@/components/UIUX/Menu/Menu";

export default function RightBar({ onPaymentClick ,items }) {
  const router = useRouter();
  
  const [isMenuVisible, setIsMenuVisible] = useState(false); // renders the element
  const [isMenuActive, setIsMenuActive] = useState(false);   // controls animation state

  const handlePayment = () => {
    if (!items || items.length === 0) {
      toast.error("No items in the cart!");
      return;
    }

    if (onPaymentClick) onPaymentClick();
  };
  
  const openMenu = () => {
    setIsMenuVisible(true);           // Show in DOM
    setTimeout(() => setIsMenuActive(true), 10); // allow transition
  };

  const closeMenu = () => {
    setIsMenuActive(false);           // trigger exit animation
    setTimeout(() => setIsMenuVisible(false), 300); // hide from DOM after animation
  };


  return (
    <>
      {/* Main Right Bar */}
      <div className="w-[28vw] flex flex-col justify-between relative">
        {/* Top Buttons */}
        <div className="flex flex-col">
          <div className="flex gap-2 p-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 flex-col justify-center items-center p-5 gap-3 border-gray-600 border text-white hover:bg-gray-700 cursor-pointer">
                <h1>X</h1>
              </div>
            ))}
          </div>
          <div className="flex">2</div>
          <div className="flex">3</div>
        </div>

        {/* Bottom Control Buttons */}
        <div className="flex flex-col gap-2 p-4">
          {/* Row 1 */}
          <div className='flex h-16'>
            <button className="w-[24%] border border-gray-300 text-white py-3 rounded hover:bg-gray-700">
              <div className='flex flex-col justify-center items-center gap-y-1.5'>
                <FaMoneyBillWave className="w-5 h-5 text-green-400 " />
                <h4 className='text-[12px] font-bold'>Cash Drawer</h4>
              </div>
            </button>
          </div>

          {/* Row 2 */}
          <div className="flex h-16 justify-between gap-2">
            {[...Array(3)].map((_, i) => (
              <button key={i} className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">
                <div className='flex flex-col justify-center items-center gap-y-1.5'>
                  <FaMoneyBillWave className="w-5 h-5 text-green-400 " />
                  <h4 className='text-[12px] font-bold'>Cash Drawer</h4>
                </div>
              </button>
            ))}
            <button
              onClick={() => router.push('/Dashboard')}
              className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">
              DashBoard
            </button>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between gap-2 h-16">
            <button className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 5</button>
            <button className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 6</button>
            <button
              onClick={handlePayment}
              className="flex-2 bg-green-600 text-white py-3 px-1 rounded hover:bg-gray-700">
              Payment
            </button>
          </div>

          {/* Row 4 */}
          <div className="flex justify-between gap-2 h-16">
            <button className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 9</button>
            <button
              onClick={() => router.push('/products')}
              className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">Products</button>
            <button className="flex-1 border border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 11</button>
            <button
              onClick={openMenu}
              className="justify-center flex-1 border  font-bold text-4xl border-gray-300 text-white py-3 rounded hover:bg-gray-700">
              ...
            </button>
          </div>
        </div>
      </div>

      {/* Slide-In Menu Panel with closing animation */}
      {isMenuVisible && <Menu isMenuActive={isMenuActive} closeMenu={closeMenu} />}
    </>
  );
}
