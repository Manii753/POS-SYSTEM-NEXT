'use client';

import { useState } from 'react';
import { FaBackward, FaWrench } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProductPage({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    barcodes: [],
    price: '',
    stock: '',
  });

  const [barcodeInput, setBarcodeInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBarcodeChange = (e) => {
    setBarcodeInput(e.target.value);
  };

  const handleBarcodeKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = barcodeInput.trim();
      if (!trimmed) return;

      if (form.barcodes.includes(trimmed)) {
        toast.error('🚫 Barcode already added');
        setBarcodeInput('');
        return;
      }

      setForm((prev) => ({
        ...prev,
        barcodes: [...prev.barcodes, trimmed],
      }));

      setBarcodeInput('');
    }
  };

  const removeBarcode = (code) => {
    setForm((prev) => ({
      ...prev,
      barcodes: prev.barcodes.filter((b) => b !== code),
    }));
  };

  const generateSKU = () => {
    if (!form.name.trim()) {
      toast.error('❌ Please enter a product name first');
      return;
    }

    const namePart = form.name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 5);

    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    setForm((prev) => ({
      ...prev,
      sku: `${namePart}-${randomDigits}`,
    }));
  };

  const handleSubmit = async () => {
    if (typeof window !== 'undefined' && window.api?.addProduct) {
      const response = await window.api.addProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });

      if (!response.success) {
        toast.error(`🚫 ${response.error}`);
        return;
      }

      toast.success('✅ Product saved successfully');
      onClose(); // Close drawer after save
    } else {
      toast.error('❌ Electron API not available');
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 h-full overflow-y-auto">
      <Toaster position="top-right" />
      <button type="button" onClick={onClose} className="mb-4">
        <FaBackward className="hover:bg-amber-900" />
      </button>

      <h1 className="text-xl mb-4 font-bold">Add Product</h1>

      <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        className="mb-2 p-2 bg-gray-700 w-full"
        value={form.name}
      />

      <div className="flex mb-2 gap-2">
        <input
          name="sku"
          placeholder="S-K-U"
          onChange={handleChange}
          className="p-2 bg-gray-700 flex-1"
          value={form.sku}
        />
        <button
          type="button"
          onClick={generateSKU}
          className="bg-blue-600 hover:bg-blue-800 px-3 cursor-pointer rounded text-sm flex items-center gap-1"
        >
          <FaWrench />
          Generate SKU
        </button>
      </div>

      <input
        name="barcode"
        placeholder="Scan or type barcode then press Enter"
        value={barcodeInput}
        onChange={handleBarcodeChange}
        onKeyDown={handleBarcodeKeyDown}
        className="mb-2 p-2 bg-gray-700 w-full"
      />

      {form.barcodes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {form.barcodes.map((code, index) => (
            <span
              key={index}
              className="bg-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1"
            >
              {code}
              <button
                onClick={() => removeBarcode(code)}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        className="mb-2 p-2 bg-gray-700 w-full"
        value={form.price}
      />

      <input
        name="stock"
        placeholder="Stock"
        type="number"
        onChange={handleChange}
        className="mb-4 p-2 bg-gray-700 w-full"
        value={form.stock}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
      >
        Save Product
      </button>
    </div>
  );
}
