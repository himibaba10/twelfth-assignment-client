import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";

const WinningContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: contests, isLoading } = useQuery({
    enabled: user ? true : false,
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winning-contests/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      <div className="overflow-x-auto bg-white w-full max-w-4xl p-8">
        <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
          My Winning Contests
        </h1>
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
                    <span>Participated</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl">You did not win any contest</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinningContests;
