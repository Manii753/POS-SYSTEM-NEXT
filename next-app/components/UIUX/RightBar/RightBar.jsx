import {BiCross} from 'react-icons'
const RightBar = ({}) => {
  return (
    <>
    <div className="w-[31vw] flex flex-col justify-between ">
      <div className="flex flex-col">
        <div className="flex gap-2 p-2">
          <div className="flex-1 flex-col justify-center items-center p-7  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-7  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-7  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
          <div className="flex-1 flex-col justify-center items-center p-7  gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1></h1>
          </div>
        </div>
        <div className="flex">2</div>
        <div className="flex">3</div>
      </div>
        <div className="flex flex-col gap-2 p-4">
            <div className='flex h-20'>
              <button className="w-[24%] bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 1</button>

            </div>
        {/* Row 1 */}
            <div className="flex h-20 justify-between gap-2">
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 1</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 2</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 3</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 4</button>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between gap-2 h-20">
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 5</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 6</button>
              <button className="flex-2 bg-green-600 text-white py-3 rounded hover:bg-gray-700">
                <h1>Payment</h1>
              </button>
              
            </div>

            {/* Row 3 */}
            <div className="flex justify-between gap-2 h-20">
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 9</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 10</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 11</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 12</button>
            </div>
          </div>

      </div>
    </>
  );
}

export default RightBar