'use client';
import { useRef, useEffect, useState } from 'react';
import { FaHashtag, FaBarcode, FaStar, FaTag, FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SearchBar = ({ onProductSelected }) => {
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [barcodeBuffer, setBarcodeBuffer] = useState('');
  const lastCharTime = useRef(Date.now());

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      if (window.api?.getProducts) {
        const all = await window.api.getProducts();
        setProducts(all);
      }
    };
    fetchProducts();
  }, []);

  // Global keydown listener for barcode scan
  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = Date.now();
      const timeDiff = now - lastCharTime.current;

      if (timeDiff > 100) {
        setBarcodeBuffer(e.key);
      } else {
        setBarcodeBuffer((prev) => prev + e.key);
      }

      lastCharTime.current = now;

      if (e.key === 'Enter') {
        const barcode = barcodeBuffer.trim();

        const found = products.find(
          (p) =>
            Array.isArray(p.barcodes) &&
            p.barcodes.some((code) => code.toLowerCase() === barcode.toLowerCase())
        );

        if (found) {
          onProductSelected?.(found);
          setQuery('');
        } else {
          toast.error('Product not found for barcode: ' + barcode);
          setQuery('');
        }

        setBarcodeBuffer('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [barcodeBuffer, products, onProductSelected]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setShowDropdown(true);
    setSuggestions(products);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(true);

    const valLower = val.toLowerCase();
    setSuggestions(
      val.trim() === ''
        ? products
        : products.filter((p) =>
            p.name.toLowerCase().includes(valLower) ||
            p.sku?.toLowerCase().includes(valLower) ||
            p.barcodes?.some((code) => code.toLowerCase().includes(valLower))
          )
    );
  };

  const handleSelect = (product) => {
    setQuery('');
    setShowDropdown(false);
    setSuggestions([]);
    onProductSelected?.(product);
  };

  return (
    <div ref={wrapperRef} className="relative flex items-center m-3 gap-15">
      <div className="flex text-white gap-10 items-center">
        <FaHashtag style={{ fontSize: '25px' }} />
        <FaBarcode style={{ fontSize: '25px' }} />
        <FaStar style={{ fontSize: '25px' }} />
        <FaTag className="text-blue-400" style={{ fontSize: '25px' }} />
      </div>
      <div className="flex flex-1 gap-5 relative">
        <FaSearch className="text-white" style={{ fontSize: '20px' }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Search by Product Name, SKU, or Barcode"
          className="w-full text-white bg-transparent border-0 focus:outline-none focus:ring-0 focus:border-0"
        />

        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-9 left-7 w-[98%] bg-gray-500 text-white rounded shadow-lg z-50">
            {suggestions.map((product, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between"
                onClick={() => handleSelect(product)}
              >
                <span>{product.name}</span>
                <span>Rs {product.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
