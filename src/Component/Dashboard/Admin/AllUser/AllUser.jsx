import { useState, useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Layout/Shared/Loading/Loading";

const AllUser = () => {
  const { user, loading } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/all-user`);
        const data = await res.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [user?.email]);

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((p, index) => (
                <tr key={p._id}>
                  <th>{index + 1}</th>
                  <td className="flex items-center gap-2"><img className="w-10 rounded-full h-10" src={p.photo} alt="" />{p.name || "N/A"}</td>
                  <td>{p.email}</td>
                  <td>
                    <span className="capitalize">{p.role || "customer"}</span>
                  </td>
                  <td>
                    {/* Dropdown for status change */}
                    <select
                      defaultValue={p.status || "active"}
                      className="select select-bordered select-sm"
                      onChange={(e) => {
                        console.log(
                          `User: ${p.email} → New Status: ${e.target.value}`
                        );
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
