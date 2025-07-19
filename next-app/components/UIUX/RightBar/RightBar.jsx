import {BiCross} from 'react-icons'
const RightBar = ({}) => {
  return (
    <>
    <div className="flex flex-col justify-between ">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col justify-center items-center p-7 px-11 gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1>DELETE</h1>
          </div>
          <div className="flex flex-col justify-center items-center p-7 px-11 gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1>DELETE</h1>
          </div>
          <div className="flex flex-col justify-center items-center p-7 px-11 gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1>DELETE</h1>
          </div>
          <div className="flex flex-col justify-center items-center p-7 px-11 gap-3 border-gray-600 border-1 text-white hover:bg-gray-700 cursor-pointer">
            <h1>X</h1>
            <h1>DELETE</h1>
          </div>
        </div>
        <div className="flex">2</div>
        <div className="flex">3</div>
      </div>
        <div className="flex flex-col gap-2 p-4">
        {/* Row 1 */}
            <div className="flex justify-between gap-2">
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 1</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 2</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 3</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 4</button>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between gap-2">
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 5</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 6</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 7</button>
              <button className="flex-1 bg-gray-800 text-white py-3 rounded hover:bg-gray-700">Btn 8</button>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between gap-2">
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