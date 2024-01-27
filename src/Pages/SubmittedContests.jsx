import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useRegistrations from "../hooks/useRegistrations";
import Loader from "../Components/Shared/Loader";

const SubmittedContests = () => {
  const { registrations, refetch } = useRegistrations();
  const axiosSecure = useAxiosSecure();
  const { dispatchAuth, loading } = useAuth();

  const handleMakeWinner = (registration) => {
    Swal.fire({
      title: "Are you sure you want to make winner?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Winner",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchAuth({ type: "LOADING" });
        axiosSecure
          .patch(`/contest/winner`, {
            contestId: registration.contestId,
            userId: registration._id,
          })
          .then((res) => {
            if (res.data.status === "success") {
              Swal.fire({
                title: "Winner Made!",
                text: "You successfully made a winner",
                icon: "success",
              });
              refetch();
            } else {
              Swal.fire({
                title: "Can't make a winner",
                text: "Winner already exists",
                icon: "error",
              });
            }
            dispatchAuth({ type: "LOADED" });
          })
          .catch((err) => {
            console.log(`Error making winner with ${err.message}`);
          });
      }
    });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-white w-full max-w-4xl p-8">
          <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
            Submitted Contests
          </h1>
          {registrations.length ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Contest Name</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {registrations.map((registration, idx) => {
                  return (
                    <tr key={registration._id}>
                      <th>{idx + 1}</th>
                      <td>{registration.contest}</td>
                      <td>{registration.name}</td>
                      <td>{registration.email}</td>
                      <td>
                        {registration.participated
                          ? "Participated"
                          : "Registered"}
                      </td>
                      <td>
                        {registration.participated ? (
                          registration.winner ? (
                            "Already Winner"
                          ) : (
                            <button
                              onClick={() => handleMakeWinner(registration)}
                              className="btn bg-primary text-white"
                            >
                              Make Winner
                            </button>
                          )
                        ) : (
                          <span>Unavailable</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl">
                You do not have any registered contest
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmittedContests;
