'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PaymentScreen({ items, onClose, setItems }) {
  const router = useRouter();
  const [cashGiven, setCashGiven] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNumberClick = (num) => {
    setCashGiven((prev) => prev + num);
  };

  const handleClear = () => {
    setCashGiven('');
  };

  const getChange = () => {
    return (parseFloat(cashGiven || '0') - total);
  };

  const handlePay = () => {
    if (parseFloat(cashGiven) >= total) {
      toast.success("Payment Successful! 🎉");
      setItems([]); // Reset cart
      onClose();
    } else {
      toast.error("Not enough cash!");
    }
  };

  return (
    <div className="flex w-full h-full bg-gray-800 text-white">
      {/* Receipt */}
      <div className="h-screen w-1/3 p-5 space-y-3 border-r border-white/20">
        <h2 className="text-xl font-bold mb-2">Receipt</h2>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-white/30 pt-2 space-y-1">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>Rs {total}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Change:</span>
            <span>Rs {getChange()}</span>
          </div>
        </div>
        <button
          className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-800"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      {/* Numpad */}
      <div className="w-2/3 p-5 flex flex-col items-center justify-center space-y-4">
        <div className="text-3xl bg-black w-full text-center py-4 rounded">
          Rs {cashGiven}
        </div>
        <div className="grid grid-cols-3 gap-2 w-full">
          {[1,2,3,4,5,6,7,8,9,0].map((num) => (
            <button
              key={num}
              className="bg-blue-600 py-4 rounded hover:bg-blue-800 text-xl"
              onClick={() => handleNumberClick(num.toString())}
            >
              {num}
            </button>
          ))}
          <button
            className="col-span-2 bg-yellow-500 py-4 rounded hover:bg-yellow-700 text-xl"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-green-600 py-4 rounded hover:bg-green-800 text-xl"
            onClick={handlePay}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
