import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    mrp: "",
    price: "",
    stock: "",
    category: "",
    desc: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product Added Successfully");
      setFormData({
        name: "",
        slug: "",
        image: "",
        mrp: "",
        price: "",
        stock: "",
        category: "",
        desc: "",
      });
    } catch (err) {
      alert(err.response?.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="slug" placeholder="Slug" onChange={handleChange} required />
      <input name="image" placeholder="Image URL" onChange={handleChange} required />
      <input name="mrp" placeholder="MRP" type="number" onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
      <input name="stock" placeholder="Stock" type="number" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <textarea name="desc" placeholder="Description" onChange={handleChange}></textarea>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;