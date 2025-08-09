import React from 'react'

const Menu = ({closeMenu,isMenuActive}) => {
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
              <p>This is the side menu.</p>
              <p>You can put settings, tools, etc., here.</p>
            </div>
          </div>
        </>
  )
}

export default Menu