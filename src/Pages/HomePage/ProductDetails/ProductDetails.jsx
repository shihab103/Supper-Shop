import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../../Layout/Shared/Loading/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <section className="py-12 px-6 md:px-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-100 shadow rounded-lg p-6 flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">Price: {product.price}৳</p>
          <p className="text-gray-600">Stock: {product.stock} pcs</p>
          <p className="text-gray-600">Category: {product.categoryName}</p>
          <button className="btn btn-success mt-4">Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
