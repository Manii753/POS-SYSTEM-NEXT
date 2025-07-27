'use client';



import {BiCross} from 'react-icons'
import { GiCash } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from 'next/navigation';



const RightBar = ({ onPaymentClick }) => {
  const router = useRouter();
  return (
    <>
    <div className="w-[28vw] flex flex-col justify-between ">
      <div className="flex flex-col">
        <div className="flex gap-2 p-2">
          <div className="flex-1 flex-col justify-center items-center p-5  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-5  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-5  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-5  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
        </div>
        <div className="flex">2</div>
        <div className="flex">3</div>
      </div>
        <div className="flex flex-col gap-2 p-4">
            <div className='flex h-16'>
              <button className="w-[24%] border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">
                <div className='flex flex-col justify-center items-center gap-y-1.5'>
                  <FaMoneyBillWave className="w-5 h-5 text-green-400 " />
                  <h4 className='text-[12px] font-bold'>Cash Drawer</h4>
                </div>
              </button>

            </div>
        {/* Row 1 */}
            <div className="flex h-16 justify-between gap-2">
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">
                <div className='flex flex-col justify-center items-center gap-y-1'>
                  <span className='text-[14px] font-bold'>%</span>
                  <span className='text-[12px] font-bold'>Discount</span>
                </div>
              </button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">
                <div className='flex flex-col justify-center items-center gap-y-1.5'>
                  <FaMoneyBillWave className="w-5 h-5 text-green-400 " />
                  <h4 className='text-[12px] font-bold'>Cash Drawer</h4>
                </div>
                
              </button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">
                <div className='flex flex-col justify-center items-center gap-y-1.5'>
                  <FaMoneyBillWave className="w-5 h-5 text-green-400 " />
                  <h4 className='text-[12px] font-bold'>Cash Drawer</h4>
                </div>
              </button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 4</button>
              
            </div>

            {/* Row 2 */}
            <div className="flex justify-between gap-2 h-16">
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 5</button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 6</button>
              <button
                onClick={onPaymentClick}
                className="flex-2  bg-green-600 text-white py-3 px-1 rounded hover:bg-gray-700">
                
                <h1>Payment</h1>
              </button>
              
            </div>

            {/* Row 3 */}
            <div className="flex justify-between gap-2 h-16">
              <button
                onClick={()=> router.push('/add-product')}
                className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700"
              >
                Add Products
              </button>
              <button 
                onClick={()=> router.push('/products')}
                className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Products</button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 11</button>
              <button className="flex-1 border-1 border-gray-300 text-white py-3 rounded hover:bg-gray-700">Btn 12</button>
            </div>
          </div>

      </div>
    </>
  );
}

export default RightBar