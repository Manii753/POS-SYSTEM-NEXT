'use client';
import { useState } from "react";
import { FaBackspace, FaEdit } from "react-icons/fa";

const LeftContent = ({ }) => {
    const [items, setItems] = useState([
        { productName: "Product 1", quantity: 2, price: 20 },
        { productName: "Product 2", quantity: 1, price: 15 },
        { productName: "Product 3", quantity: 5, price: 10 },
        { productName: "Product 4", quantity: 3, price: 25 },
        { productName: "Product 5", quantity: 4, price: 30 },
    ]);

    const [newProduct, setNewProduct] = useState({
        productName: "",
        quantity: 1,
        price: 0
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleDelete = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewProduct(items[index]);
    };

    const handleSave = () => {
        if (editingIndex !== null) {
            const updatedItems = [...items];
            updatedItems[editingIndex] = newProduct;
            setItems(updatedItems);
            setEditingIndex(null);
        } else {
            setItems([...items, newProduct]);
        }
        setNewProduct({ productName: "", quantity: 1, price: 0 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: name === 'quantity' || name === 'price' ? Number(value) : value
        });
    };

    return (
      <div className="flex flex-col w-[69vw]">
        <div className=" h-[90vh] bg-black/20 rounded-lg shadow-lg overflow-y-scroll custom-scrollbar flex flex-col">
            <table className="w-full">
                <thead>
                    <tr className="text-white border-blue-900 border-t-1 border-b-1 h-12">
                        <th className="px-4 text-left">ProductName</th>
                        <th className="px-4 text-right">Quantity</th>
                        <th className="px-4 text-right">Price</th>
                        <th className="px-4 text-right">Amount</th>
                        <th className="px-4 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="">
                    {/* Add/Edit Form Row */}
                    <tr className="text-white bg-black/30 h-12">
                        <td className="px-4">
                            <input
                                type="text"
                                name="productName"
                                value={newProduct.productName}
                                onChange={handleInputChange}
                                placeholder="Product name"
                                className="bg-transparent border-b border-white/50 focus:outline-none w-full h-8"
                            />
                        </td>
                        <td className="px-4 text-right">
                            <input
                                type="number"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                min="1"
                                className="bg-transparent border-b border-white/50 w-12 focus:outline-none text-right h-8"
                            />
                        </td>
                        <td className="px-4 text-right">
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                className="bg-transparent border-b border-white/50 w-16 focus:outline-none text-right h-8"
                            />
                        </td>
                        <td className="px-4 text-right">
                            {newProduct.price * newProduct.quantity}
                        </td>
                        <td className="px-4 text-right">
                            <div className="flex justify-end gap-2 h-8 items-center">
                                <button
                                    onClick={handleSave}
                                    className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-700 text-sm"
                                >
                                    {editingIndex !== null ? 'Update' : 'Add'}
                                </button>
                                {editingIndex !== null && (
                                    <button
                                        onClick={() => {
                                            setEditingIndex(null);
                                            setNewProduct({ productName: "", quantity: 1, price: 0 });
                                        }}
                                        className="px-2 py-1 bg-gray-500 rounded hover:bg-gray-700 text-sm"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>

                    {/* Items List */}
                    {items?.map((item, index) => (
                        <tr key={index} className="text-white hover:bg-black/10 h-12">
                            <td className="px-4">{item.productName}</td>
                            <td className="px-4 text-right">{item.quantity}</td>
                            <td className="px-4 text-right">{item.price}</td>
                            <td className="px-4 text-right">{item.price * item.quantity}</td>
                            <td className="px-4 text-right">
                                <div className="flex justify-end gap-5 h-8 items-center">
                                    <FaEdit
                                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                                        onClick={() => handleEdit(index)}
                                    />
                                    <FaBackspace
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                    {items.length === 0 && (
                        <tr>
                            <td colSpan="5" className="h-[calc(80vh-96px)]">
                                <div className="flex flex-col text-white items-center text-center justify-center h-full">
                                    <span className="text-3xl">No items</span>
                                    <span className="">Add Product To Receipt Using Bar Code Scanner</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add this to your global CSS or CSS module */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </div >
        <div className="flex-1/4 pr-4">
  <div className="h-full flex items-center justify-end p-0 m-0">
    <div className="w-64 space-y-2 text-white text-right">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>
          {items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Tax (10%):</span>
        <span>
          {(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-white/30 pt-2">
        <span>Total:</span>
        <span>
          {(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
</div>

     </div>   
    );
}

export default LeftContent;