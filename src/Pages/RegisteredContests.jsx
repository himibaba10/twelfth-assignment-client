import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import useRegisteredContests from "../hooks/useRegisteredContests";
import { useState } from "react";

const RegisteredContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [sort, setSort] = useState(false);
  const { contests, isLoading, refetch } = useRegisteredContests(user, sort);

  const handleParticipate = (id) => {
    axiosSecure
      .patch(`/registered-contest/update-status/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Participated!",
            text: "You participated the contest successfully!",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(`Error updating the status with ${err.message}`);
      });
  };

  const renderer = ({ completed, id }) => {
    if (completed) {
      // Render a completed state
      return (
        <div>
          <h2 className="text-xl">Unavailable</h2>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <button
          onClick={() => handleParticipate(id)}
          className="bg-gradient-to-tr from-primary to-secondary p-2 text-white rounded"
        >
          Participate
        </button>
      );
    }
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      <div className="overflow-x-auto bg-white w-full max-w-4xl p-8">
        <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
          My Registered Contests
        </h1>
        {contests?.length ? (
          <div className="text-center mb-10">
            <button
              onClick={() => setSort(!sort)}
              className="btn bg-primary hover:bg-secondary text-white text-lg font-medium"
            >
              Sort by Date
            </button>
          </div>
        ) : (
          <></>
        )}
        {isLoading ? (
          <Loader />
        ) : contests?.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Contest Name</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-base">
              {contests.map((contest, idx) => (
                <tr key={contest._id}>
                  <th>{idx + 1}</th>
                  <td>{contest.contest}</td>
                  <td>{contest.deadline}</td>
                  <td>
                    {!contest.participated ? (
                      <Countdown
                        date={new Date(`${contest.deadline}T00:00:00.000Z`)}
                        renderer={(props) =>
                          renderer({ ...props, id: contest._id })
                        }
                        test={"Hi"}
                      />
                    ) : (
                      <span>Participated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl">You did not register any contest</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredContests;
