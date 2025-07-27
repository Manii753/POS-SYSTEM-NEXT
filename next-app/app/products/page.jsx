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
      <h1 className="text-2xl mb-4">Product List</h1>
      <table className="w-full border border-white/20">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Barcode</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) =>
            editing === p.id ? (
              <tr key={p.id} className="bg-gray-800">
                <td><input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></td>
                <td><input value={formData.barcode} onChange={e => setFormData({ ...formData, barcode: e.target.value })} /></td>
                <td><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: +e.target.value })} /></td>
                <td><input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: +e.target.value })} /></td>
                <td>
                  <button onClick={handleSave} className="text-green-400">Save</button>
                </td>
              </tr>
            ) : (
              <tr key={p.id} className="hover:bg-gray-700">
                <td>{p.name}</td>
                <td>{p.barcode}</td>
                <td>Rs {p.price}</td>
                <td>{p.stock}</td>
                <td className="space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-yellow-400">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
