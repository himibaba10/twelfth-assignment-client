import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    enabled: user?.email ? true : false,
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const handleChangeUserRole = (id, role) => {
    axiosSecure
      .patch(`/user/update-role/${id}`, { role })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Successful!",
            text: "User role updated successfully",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(`Error updating user role ${err.message}`);
      });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      {isLoading ? (
        <Loader className="text-white scale-150" />
      ) : (
        <div className="bg-white p-5 sm:p-10 w-full max-w-4xl">
          <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
            Manage Users
          </h1>
          <div className="overflow-x-auto md:overflow-visible">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="font-bold text-lg text-black">
                  <th></th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn m-1 w-20 bg-primary text-white font-medium"
                        >
                          {user.role}
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          {user.role !== "user" && (
                            <li
                              className="cursor-pointer p-2 rounded hover:text-white hover:bg-secondary"
                              onClick={() =>
                                handleChangeUserRole(user._id, "user")
                              }
                            >
                              User
                            </li>
                          )}
                          {user.role !== "creator" && (
                            <li
                              className="cursor-pointer p-2 rounded hover:text-white hover:bg-secondary"
                              onClick={() =>
                                handleChangeUserRole(user._id, "creator")
                              }
                            >
                              Creator
                            </li>
                          )}
                          {user.role !== "admin" && (
                            <li
                              className="cursor-pointer p-2 rounded hover:text-white hover:bg-secondary"
                              onClick={() =>
                                handleChangeUserRole(user._id, "admin")
                              }
                            >
                              Admin
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
