import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.email) navigate("/login");
  }, [user, navigate]);

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.email}`);
        const data = await res.json();
        setUserData(data);
        reset({
          name: data.name,
          email: data.email,
          phone: data.phone,
          billingAddress: data.billingAddress,
          photo: data.photo,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchUser();
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      let photoUrl = userData?.photo || "";

      // Upload photo to imgbb if new file selected
      if (formData.photo[0]) {
        const imageForm = new FormData();
        imageForm.append("image", formData.photo[0]);

        const resImg = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: "POST",
          body: imageForm,
        });
        const imgData = await resImg.json();
        photoUrl = imgData.data.url;
      }

      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        billingAddress: formData.billingAddress,
        photo: photoUrl,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/update-user/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (result.acknowledged) {
        Swal.fire("Success", "Profile updated successfully!", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={userData?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            {...register("phone", { required: "Phone is required" })}
            className="input input-bordered w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Billing Address */}
        <div>
          <label className="block mb-1 font-medium">Billing Address</label>
          <textarea
            {...register("billingAddress", { required: "Billing address is required" })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.billingAddress && <p className="text-red-500 text-sm">{errors.billingAddress.message}</p>}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1 font-medium">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            className="file-input file-input-bordered w-full"
          />
          {userData?.photo && (
            <img
              src={userData.photo}
              alt="Current Photo"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
      </form>
    </section>
  );
};

export default Account;
