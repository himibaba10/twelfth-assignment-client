import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useContests from "../hooks/useContests";
import { CiTrash } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const CreatedContests = () => {
  const { contests, refetch } = useContests();
  const axiosSecure = useAxiosSecure();
  const { dispatchAuth } = useAuth();

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete contest?",
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
            dispatchAuth({
              type: "FAILURE",
            });
          });
      }
    });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      <div className="overflow-x-auto bg-white w-full max-w-4xl p-8">
        <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
          My Contests
        </h1>
        {contests.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Contest Name</th>
                <th>Deadline</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {contests.map((contest, idx) => {
                return (
                  <tr
                    className={`${
                      new Date(contest.deadline) < new Date() &&
                      "bg-gray-300 opacity-50 pointer-events-none"
                    }`}
                    key={contest._id}
                  >
                    <th>{idx + 1}</th>
                    <td>{contest.name}</td>
                    <td>
                      {new Date(contest.deadline) < new Date()
                        ? "Registation closed"
                        : contest.deadline}
                    </td>
                    <td>
                      {contest.status === "pending" ? (
                        <CiTrash
                          className="cursor-pointer"
                          onClick={() => handleDeleteContest(contest._id)}
                          size={30}
                        />
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </td>
                    <td>
                      {contest.status === "pending" ? (
                        <Link
                          to={`/dashboard/creator/update-contest/${contest._id}`}
                          className="bg-primary p-3 text-white rounded"
                        >
                          Update
                        </Link>
                      ) : (
                        <span>Unavailable</span>
                      )}
                    </td>
                    <td className="capitalize">{contest.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl">You do not have any contest</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatedContests;
