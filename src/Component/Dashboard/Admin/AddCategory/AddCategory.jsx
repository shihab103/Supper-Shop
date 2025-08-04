import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const category = {
      name: data.name,
      image: data.image,
    };

    try {
      const res = await fetch("http://localhost:3000/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      const result = await res.json();
      console.log("Added: ", result);
      Swal.fire({
        icon: "success",
        title: "Added Successful",
        text: `Welcome`,
      });
      reset();
    } catch (error) {
      console.error("Error adding category:", error);
    }

    // After successful upload & save
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6  rounded shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            {...register("name", { required: "Category name is required" })}
            placeholder="e.g. Groceries"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Category Image */}
        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="url"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
