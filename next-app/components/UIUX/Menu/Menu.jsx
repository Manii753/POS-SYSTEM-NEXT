import { useRouter } from 'next/navigation';
import React from 'react'

const Menu = ({closeMenu,isMenuActive}) => {
    const router = useRouter();
  return (
        <>
          {/* Overlay (dark + blur + click block) */}
          <div
            className={`fixed inset-0 z-40 backdrop-blur-xs transition-opacity duration-300 ${
              isMenuActive ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
          />

          {/* Slide-In Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-[22vw] bg-gray-900 rounded shadow-lg z-50 transform transition-all duration-300 ease-in-out
              ${isMenuActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
          >
            <div className="p-4 flex justify-between items-center border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={closeMenu} className="text-white text-2xl">×</button>
            </div>
            <div className="p-4 text-white">
                <ul className="space-y-2">
                    <li onClick={()=> router.push('/Mangement')} className="hover:bg-gray-700 p-2 rounded cursor-pointer">Management</li>
                    <div className='h-[1px] bg-gray-400'></div>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">View Sales History</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Sales</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Reports</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Settings</li>
                </ul>
              
            </div>
          </div>
        </>
  )
}

export default Menu