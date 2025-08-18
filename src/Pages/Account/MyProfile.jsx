import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Layout/Shared/Loading/Loading";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/user/${user.email}`
        );
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  if (loading || isLoading) {
    return <Loading/>
  }

  if (!profile) {
    return <p className="text-center mt-10">Profile not found.</p>;
  }

  return (
    <div className="min-h-screen bg flex justify-center items-center p-4">
      <div className="card w-full max-w-3xl card-bg shadow-xl">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-28 h-28 rounded-full border-4 border-primary object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-500">📞 {profile.phone}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Billing Address</h3>
            <p className="whitespace-pre-line btn-bg p-3 rounded-lg">
              {profile.billingAddress}
            </p>
          </div>


          {/* Edit Button */}
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-bg">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
