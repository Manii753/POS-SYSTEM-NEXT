'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBackward } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    barcode: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (typeof window !== 'undefined' && window.api?.addProduct) {
      await window.api.addProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      router.push('/');
      console.log("product saved succesfully")
    } else {
      alert('Electron API not available');
    }
  };

  return (
    
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <button 
        onClick={()=> router.push('/products')}><FaBackward className='hover:bg-amber-900'/>
      </button>
      <h1 className="text-xl mb-4 font-bold">Add Product</h1>
      <input name="name" placeholder="Name" onChange={handleChange} className="mb-2 p-2 bg-gray-700 w-full" />
      <input name="barcode" placeholder="Barcode" onChange={handleChange} className="mb-2 p-2 bg-gray-700 w-full" />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} className="mb-2 p-2 bg-gray-700 w-full" />
      <input name="stock" placeholder="Stock" type="number" onChange={handleChange} className="mb-4 p-2 bg-gray-700 w-full" />
      <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
        Save Product
      </button>
    </div>
  );
}
