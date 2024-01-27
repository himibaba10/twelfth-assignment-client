import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRegisteredContests from "../hooks/useRegisteredContests";
import { Cell, Legend, Pie, PieChart } from "recharts";

const Profile = () => {
  const { user, auth } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { contests } = useRegisteredContests(user);
  const WinningContests = contests?.filter((contest) => contest.winner);

  const handleChangeUser = (data) => {
    updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: data.image,
    }).then(() => {
      axiosSecure
        .patch(`/user/update/${user.email}`, {
          name: data.name,
          image: data.image,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Successful!",
              text: "Profile updated successfully",
              icon: "success",
            });
          }
        });
    });
  };

  const data01 = [
    {
      name: "Contests Won",
      value: WinningContests?.length,
    },
    {
      name: "Contests Lost",
      value: contests?.length - WinningContests?.length,
    },
  ];

  const colors = ["#1a73e8", "red"];

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex items-center">
      <div className="w-full flex justify-center items-center section gap-10">
        <div className="w-1/2">
          <div className="bg-white p-5 sm:p-10 max-w-lg">
            <form onSubmit={handleSubmit(handleChangeUser)}>
              <h1 className="text-center text-3xl sm:text-5xl font-bold font-exo mb-7">
                Change Your Info
              </h1>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name*"
                defaultValue={user?.displayName}
                className="input border-secondary w-full mb-3 rounded-none py-5 sm:py-7"
              />

              <input
                type="text"
                defaultValue={user?.photoURL}
                {...register("image", { required: true })}
                placeholder="Enter image URL*"
                className="input border-secondary w-full rounded-none py-5 sm:py-7"
              />

              <input
                className="btn w-full mt-6 rounded-none min-h-0 h-12 sm:h-14 text-lg bg-gradient-to-tr from-primary to-secondary text-white"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-white p-10">
          {contests?.length ? (
            <>
              <h2 className="text-3xl text-center font-bold">Your Winning</h2>
              <PieChart width={350} height={280} className="mx-auto">
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={26} />
              </PieChart>
              <p className="text-center text-lg font-medium">
                Participated in {contests.length} contests
              </p>
            </>
          ) : (
            <h2>You did not participate any contest</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
