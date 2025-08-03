'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBackward, FaWrench } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 💡 SKU generator with toast validation
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
      await window.api.addProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      router.push('/');
      toast.success('✅ Product saved successfully');
    } else {
      toast.error('❌ Electron API not available');
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <Toaster position="top-right" />
      <button type="button" onClick={() => router.push('/products')}>
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
        placeholder="Barcode"
        onChange={handleChange}
        className="mb-2 p-2 bg-gray-700 w-full"
        value={form.barcode}
      />

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
