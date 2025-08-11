'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentScreen({ items, onClose, setItems }) {
  const [cashGiven, setCashGiven] = useState('');
  const [saleInfo, setSaleInfo] = useState(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNumberClick = (num) => setCashGiven((prev) => prev + num);
  const handleClear = () => setCashGiven('');
  const getChange = () => parseFloat(cashGiven || '0') - total;

  const handlePay = async () => {
    const paid = parseFloat(cashGiven);
    if (paid >= total) {
      try {
        const now = new Date();
        const saleData = {
          totalAmount: total,
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
        };

        const savedSale = await window.api.addSale(saleData);
        const finalSale = { ...saleData, documentCode: savedSale.documentCode, change: getChange() };

        toast.success(`Payment Successful 🎉\nCode: ${finalSale.documentCode}`);
        setSaleInfo(finalSale);
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

  const handleDownloadPDF = async () => {
    if (saleInfo) {
      await window.api.downloadReceiptPDF(saleInfo); // You'll need to implement this
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-800 text-white">
      
      {/* Left Receipt Panel */}
      <div className="flex flex-col w-1/6 justify-between h-full p-5 border-r border-white/20">
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

      {/* Right Panel */}
      <div className="p-5 flex flex-[2] flex-col justify-between">
        {saleInfo ? (
          <>
            {/* Change Display */}
            <div className="text-center text-2xl font-bold text-green-400">
              Change: Rs {saleInfo.change}
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 flex-1 justify-center">
              <button
                className="bg-green-600 px-8 py-4 rounded hover:bg-green-800 w-2/3 text-lg"
                onClick={handlePrint}
              >
                🖨️ Print Receipt
              </button>
              <button
                className="bg-yellow-500 px-8 py-4 rounded hover:bg-yellow-700 w-2/3 text-lg"
                onClick={handleDownloadPDF}
              >
                📄 Download PDF
              </button>
            </div>

            {/* Done button bottom right */}
            <div className="flex justify-end">
              <button
                className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-800 text-lg"
                onClick={() => {
                  onClose();
                  setItems([]);
                }}
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <>
          <div className="h-full flex flex-col justify-between items-end text-center text-2xl font-bold mb-4">
            
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
            <div className="grid grid-cols-3 w-fit gap-1 items-end">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
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
          </div>  
          </>
        )}
      </div>
    </div>
  );
}
