'use client';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', barcode: '', price: '', stock: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const result = await window.api.getProducts();
    setProducts(result);
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setFormData(product);
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
    <div className="p-6 text-white">
        <h1 className="text-3xl m-3 ml-0 text-left">Product List</h1>
        <table className="w-full border border-white/20">
            <thead>
                <tr className="bg-gray-700 font-bold divide-x divide-gray-600">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Barcode</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Stock</th>
                    <th className="p-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
                {products.map((p) =>
                    editing === p.id ? (
                        <tr key={p.id} className="hover:bg-gray-700 divide-x divide-gray-50">
                            <td className="p-2.5 text-left"><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></td>
                            <td className="p-2.5 text-left"><input value={formData.barcode} onChange={e => setFormData({ ...formData, barcode: e.target.value })} /></td>
                            <td className="p-2.5 text-left"><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} /></td>
                            <td className="p-2.5 text-left"><input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: +e.target.value })} /></td>
                            <td className="flex flex-row justify-evenly">
                                <button onClick={handleSave} className="text-green-400">Save</button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={p.id} className="hover:bg-gray-700 divide-x divide-gray-600">
                            <td className="p-2.5 text-left">{p.name}</td>
                            <td className="p-2.5 text-left">{p.barcode}</td>
                            <td className="p-2.5 text-left">Rs {p.price}</td>
                            <td className="p-2.5 text-left">{p.stock}</td>
                            <td className="flex flex-row justify-evenly">
                                <button
                                    onClick={() => handleEdit(p)} 
                                    className="text-green-400 p-3 flex-1">Edit</button>
                                <div className="bg-gray-600 w-[1px]"></div>
                                <button 
                                    onClick={() => handleDelete(p.id)} 
                                    className="text-red-500 p-3 flex-1">Delete</button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    </div>
);
}
