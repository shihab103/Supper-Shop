import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const expiryDate = watch("expiryDate"); // expiry date watch

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Submit handler
  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    // Upload to imgbb
    const formDataImg = new FormData();
    formDataImg.append("image", imageFile);

    try {
      const resImg = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: "POST", body: formDataImg }
      );
      const imgData = await resImg.json();
      const imageUrl = imgData.data.url;

      const selectedCategory = categories.find(
        (cat) => cat._id === data.categoryId
      );

      const newProduct = {
        name: data.name,
        image: imageUrl,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        categoryId: data.categoryId,
        categoryName: selectedCategory?.name,
        createdAt: new Date(),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null, // expiry date
      };

      // Save to database
      const productRes = await fetch(
        `${import.meta.env.VITE_API_URL}/add-product`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      const result = await productRes.json();
      if (result.insertedId || result.acknowledged) {
        Swal.fire("Success!", "Product added successfully", "success");
        reset();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Price (৳)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className="input input-bordered w-full"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
