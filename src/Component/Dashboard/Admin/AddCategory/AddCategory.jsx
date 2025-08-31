import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddCategory = () => {
  const navigate  = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const imageFile = data.image[0]; 

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgbbData = await imgbbRes.json();
      const imageUrl = imgbbData.data.url;

      const category = {
        name: data.name,
        image: imageUrl,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/add-category`, {
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
        title: "Category Added!",
        text: `Category "${category.name}" has been added.`,
      });

      reset();
      navigate('/');
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto secondary p-6 rounded shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            {...register("name", { required: "Category name is required" })}
            placeholder="e.g. Groceries"
            className="input bg input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Category Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input bg file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button type="submit" className="btn primary text-white w-full">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
