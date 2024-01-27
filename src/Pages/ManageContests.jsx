import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import Swal from "sweetalert2";
import { CiTrash } from "react-icons/ci";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests`);
      return res.data;
    },
  });

  const handleContestStatus = (id) => {
    Swal.fire({
      title: "Are you sure you'll update the status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update Status",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/contest/update-status/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Successful!",
                text: "Status updated successfully",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {
            console.log(`Error confirming status with ${err.message}`);
          });
      }
    });
  };

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure you'll delete the contest?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete Contest",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contest/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Successful!",
                text: "You deleted the contest successfully!",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(`Error deleting the contest with ${err.message}`);
          });
      }
    });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      {isLoading ? (
        <Loader className="text-white scale-150" />
      ) : (
        <div className="bg-white p-5 sm:p-10 w-full max-w-5xl">
          <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
            Manage Contests
          </h1>
          <div className="overflow-x-auto md:overflow-visible">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="font-bold text-lg text-black">
                  <th></th>
                  <th>Contest Name</th>
                  <th>Contest Owner</th>
                  <th>Owner Email</th>
                  <th>Update Status</th>
                  <th>Delete Contest</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {contests.map((contest, idx) => (
                  <tr key={contest._id}>
                    <th>{idx + 1}</th>
                    <td>{contest.name}</td>
                    <td>{contest.user}</td>
                    <td>{contest.email}</td>
                    <td>
                      {contest.status !== "accepted" ? (
                        <button
                          onClick={() => handleContestStatus(contest._id)}
                          tabIndex={0}
                          role="button"
                          className="btn m-1 w-20 bg-primary text-white font-medium"
                        >
                          Confirm
                        </button>
                      ) : (
                        <span>Accepted</span>
                      )}
                    </td>
                    <td>
                      <CiTrash
                        className="mx-auto text-red-600 cursor-pointer"
                        onClick={() => handleDeleteContest(contest._id)}
                        size={25}
                      />
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

export default ManageContests;
