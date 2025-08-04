'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PaymentScreen({ items, onClose, setItems }) {
  const router = useRouter();
  const [cashGiven, setCashGiven] = useState('');
  const [saleInfo, setSaleInfo] = useState(null); // <-- Track sale after payment

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNumberClick = (num) => {
    setCashGiven((prev) => prev + num);
  };

  const handleClear = () => {
    setCashGiven('');
  };

  const getChange = () => {
    return parseFloat(cashGiven || '0') - total;
  };

  const handlePay = async () => {
    const paid = parseFloat(cashGiven);
    if (paid >= total) {
      try {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        const saleData = {
          totalAmount: total,
          date,
          time,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
        };

        const savedSale = await window.api.addSale(saleData);
        const finalSale = {
          ...saleData,
          documentCode: savedSale.documentCode,
        };

        toast.success(`Payment Successful 🎉\nCode: ${finalSale.documentCode}`);
        setSaleInfo(finalSale); // <-- Show receipt
        setItems([]);
        setCashGiven('');
      } catch (err) {
        console.error("Error saving sale:", err);
        toast.error("Something went wrong saving the sale.");
      }
    } else {
      toast.error("Not enough cash!");
    }
  };

  const handlePrint = async () => {
    if (saleInfo) {
      await window.api.printReceipt(saleInfo);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-800 text-white">
      {/* Receipt Panel */}
      <div className="flex flex-col justify-between flex-1 h-full p-5 border-r border-white/20">
        <div className="space-y-3">
          <h2 className="text-xl font-bold mb-2">Items</h2>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>Rs {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          {!saleInfo && (
            <button
              className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-800"
              onClick={onClose}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="mt-5 border-t border-white/10 pt-4 flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>Rs {total}</span>
        </div>
      </div>

      {/* Right Panel: Payment OR Receipt */}
      <div className="p-5 flex flex-4 flex-col items-end justify-between space-y-4">
        {saleInfo ? (
          <div className="w-full text-white text-lg space-y-4">
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold">Receipt</h2>
              <p>Invoice: {saleInfo.documentCode}</p>
              <p>Date: {saleInfo.date}</p>
              <p>Time: {saleInfo.time}</p>
              <div className="border-t border-white/10 my-2"></div>
              {saleInfo.items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rs {item.subtotal}</span>
                </div>
              ))}
              <div className="border-t border-white/10 my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Rs {saleInfo.totalAmount}</span>
              </div>
            </div>
            <button
              className="bg-green-600 px-6 py-3 rounded hover:bg-green-800 w-full"
              onClick={handlePrint}
            >
              🖨️ Print Receipt
            </button>
            <button
              className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-800 w-full"
              onClick={onClose}
            >
              Back to POS
            </button>
          </div>
        ) : (
          <>
            <div className="w-full text-center py-4 rounded">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>Rs {total}</span>
              </div>
              <div className="flex justify-between">
                <span>Paid:</span>
                <span>Rs {cashGiven}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Change:</span>
                <span>Rs {getChange()}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[1,2,3,4,5,6,7,8,9,0].map((num) => (
                <button
                  key={num}
                  className="h-15 w-17 bg-blue-600 py-4 rounded hover:bg-blue-800 text-xl"
                  onClick={() => handleNumberClick(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button
                className="h-15 w-17 bg-yellow-500 py-4 rounded hover:bg-yellow-700 text-xl"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="h-15 w-17 bg-green-600 py-4 rounded hover:bg-green-800 text-xl"
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
