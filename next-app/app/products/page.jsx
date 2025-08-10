'use client';

import { useState } from 'react';
import AddProductPage from '../add-product/page'; 
import { FaBackward } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function ProductsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    barcodes: [],
    sku: '',
    price: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const result = await window.api.getProducts();
    setProducts(result);
    console.log('Fetched products:', result);
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setFormData({
      ...product,
      barcodes: Array.isArray(product.barcodes) ? product.barcodes : [],
    });
  };

  const handleDelete = async (id) => {
    await window.api.deleteProduct(id);
    fetchProducts();
  };

  const handleSave = async () => {
    // Check if any of the entered barcodes already exist in another product
    const duplicate = formData.barcodes.find(code =>
      products.some(prod =>
        prod.barcodes.includes(code) && prod.id !== editing
      )
    );

    if (duplicate) {
      toast.error(`Barcode "${duplicate}" already exists`);
      return; // prevent saving
    }

    await window.api.updateProduct(formData);
    setEditing(null);
    fetchProducts();
  };


  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <Toaster position="top-right" />
      {/* Products List */}
      <div className={`p-6 transition-all duration-300 ${isAddOpen ? 'opacity-50 ' : 'opacity-100'}`}>
        <div className='flex flex-row justify-between'>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          {/* Your product list rendering here */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded text-right mb-4"
          >
            Add Product
          </button>
        </div>
      

        <div>
          <table className="w-full border border-white/20">
            <thead>
              <tr className="bg-gray-700 font-bold divide-x divide-gray-600">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">S-K-U</th>
                <th className="p-2 text-left">Barcode</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Stock</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {products.map((p) =>
                editing === p.id ? (
                  <tr key={p.id} className=" hover:bg-gray-700 divide-x divide-gray-50 justify-center items-center bg-cyan-500">
                    <td className="p-2.5 text-left">
                      <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </td>
                    <td className="p-2.5 text-left">
                      <input
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </td>
                    <td className="p-2.5 text-left">
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {formData.barcodes?.map((code, index) => (
                            <span
                              key={index}
                              className="bg-blue-600 px-2 py-1 rounded flex items-center gap-1"
                            >
                              {code}
                              <button
                                className="text-white hover:text-red-400"
                                onClick={() => {

                                  const updated = [...formData.barcodes];
                                  updated.splice(index, 1);
                                  setFormData({ ...formData, barcodes: updated });
                                }}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Scan or type barcode..."
                          className="mt-1 p-1 text-black rounded"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const value = e.target.value.trim();

                              // Check against current product's barcodes
                              if (formData.barcodes.includes(value)) {
                                toast.error('Barcode already exists in this product');
                                e.target.value = '';
                                return;
                              }

                              // Check against all other products
                              const existsInDB = products.some(prod =>
                                prod.barcodes.includes(value) && prod.id !== editing
                              );
                              if (existsInDB) {
                                toast.error('Barcode already exists in another product');
                                e.target.value = '';
                                return;
                              }

                              if (value) {
                                setFormData({
                                  ...formData,
                                  barcodes: [...formData.barcodes, value],
                                });
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-2.5 text-left">
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
                      />
                    </td>
                    <td className="p-2.5 text-left">
                      <input
                        type="number"
                        value={formData.stock ?? ''}
                        onChange={(e) => setFormData({ ...formData, stock: +e.target.value })}
                      />
                    </td>
                    <td className="flex flex-row justify-evenly">
                      
                      <button onClick={handleSave} className=" text-blue-950  bg-green-500 hover:bg-green-600 p-4 rounded">
                        Save
                      </button>
                      <button onClick={() => setEditing(null)} className="text-red-500 cursor-pointer bg-amber-50 p-4 rounded ">
                        Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id} className="hover:bg-gray-700 divide-x divide-gray-600">
                    <td className="p-2.5 text-left">{p.name}</td>
                    <td className="p-2.5 text-left">{p.sku}</td>
                    <td className="p-2.5 text-left">{p.barcodes.join(', ')}</td>
                    <td className="p-2.5 text-left">Rs {p.price}</td>
                    <td className="p-2.5 text-left">{p.stock}</td>
                    <td className="flex flex-row justify-evenly">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-green-400 p-3 flex-1 cursor-pointer"
                      >
                        Edit
                      </button>
                      <div className="bg-gray-600 w-[1px]"></div>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-500 p-3 flex-1 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Overlay */}
        {isAddOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsAddOpen(false)} // close when clicking overlay
          />
        )}

        {/* Modal */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${
            isAddOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <AddProductPage onClose={() => setIsAddOpen(false)} />
        </div>

    </div>
  );
}
