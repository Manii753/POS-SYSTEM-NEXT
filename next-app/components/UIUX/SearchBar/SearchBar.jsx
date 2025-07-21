'use client';
import { useRef, useEffect, useState } from 'react';
import { FaHashtag, FaBarcode, FaStar, FaTag, FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const inputRef = useRef(null);
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    inputRef.current?.focus(); // Auto-focus on load
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const scannedValue = e.target.value.trim();
      if (scannedValue) {
        setBarcode(scannedValue);
        console.log('Scanned barcode:', scannedValue);

        // Optionally trigger search logic here...

        e.target.value = ''; // clear input for next scan
      }
    }
  };

  return (
    <div className="flex items-center m-3 gap-15">
      <div className="flex text-white gap-10 items-center">
        <FaHashtag style={{ fontSize: '25px' }} />
        <FaBarcode style={{ fontSize: '25px' }} />
        <FaStar style={{ fontSize: '25px' }} />
        <FaTag className="text-blue-400" style={{ fontSize: '25px' }} />
      </div>
      <div className="flex gap-5">
        <FaSearch className="text-white" style={{ fontSize: '20px' }} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by Product Name, SKU, or Category"
          onKeyDown={handleKeyDown}
          className="text-white bg-transparent border-0 focus:outline-none focus:ring-0 focus:border-0"
          style={{ width: '400px' }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
