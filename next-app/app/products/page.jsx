'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBackward } from 'react-icons/fa';

export default function ProductsPage() {
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
    await window.api.updateProduct(formData);
    setEditing(null);
    fetchProducts();
  };

  return (
    <div className="flex flex-col p-6 text-white">
      <button onClick={() => router.push('/')}>
        <FaBackward className="hover:bg-amber-900" />
      </button>

      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-3xl m-3 ml-0 text-left">Product List</h1>
        <div>
          <button
            onClick={() => router.push('/add-product')}
            className="cursor-pointer hover:bg-white hover:text-black bg-auto border-1 rounded p-2 mr-2"
          >
            Add Product
          </button>
        </div>
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
                <tr key={p.id} className="hover:bg-gray-700 divide-x divide-gray-50 bg-cyan-500">
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
                            if (value && !formData.barcodes.includes(value)) {
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
                  <td className="flex flex-row h-30 w-70 justify-around items-center gap-2">
                    
                    <button onClick={handleSave} className="ml-4 text-blue-950 flex-1 bg-green-500 hover:bg-green-600 p-4 rounded">
                      Save
                    </button>
                    <button onClick={() => setEditing(null)} className="text-red-500  cursor-pointer flex-1 bg-amber-50 p-4 rounded ">
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
  );
}
