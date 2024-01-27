import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "./Loader";

const AuthForm = ({ objective }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatchAuth, createUser, loginUser, loading, googleLogin } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const path = location?.state?.from || "/";

  const handleLogin = (data) => {
    dispatchAuth({ type: "LOADING" });
    loginUser(data.email, data.password)
      .then((res) => {
        dispatchAuth({ type: "SUCCESS", user: res.user });
        navigate(path);
      })
      .catch((err) => {
        console.log(`Failed to login with ${err.message}`);
        dispatchAuth({ type: "FAILURE", error: err.message });
      });
  };

  const handleSignup = (data) => {
    dispatchAuth({ type: "LOADING" });
    createUser(data.email, data.password)
      .then((res) => {
        // Update new users name and image
        updateProfile(res.user, {
          displayName: data.name,
          photoURL: data.image,
        }).then(() => {
          // Add new user to the database
          axiosPublic
            .post("/add-user", {
              name: data.name,
              email: data.email,
              image: data.image,
              role: "user",
            })
            .then((serverData) => {
              if (serverData.data.insertedId) {
                Swal.fire({
                  title: "Successful!",
                  text: "Signed up successfully",
                  icon: "success",
                });
                dispatchAuth({
                  type: "SUCCESS",
                  user: { ...res.user, displayName: data.name },
                  role: "user",
                });
                navigate(path);
                reset();
              }
            })
            .catch((err) => {
              console.log(
                `There was an error creating the user in database: ${err.message}`
              );
            });
        });
      })
      .catch((err) => {
        dispatchAuth({
          type: "FAILURE",
          error: err.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    dispatchAuth({
      type: "LOADING",
    });
    googleLogin().then((res) => {
      axiosPublic
        .post(`/add-user`, {
          name: res.user.displayName || "Anonymous",
          email: res.user.email || "Anonymous",
          image: res.user.photoURL,
          role: "user",
        })
        .then((res) => {
          dispatchAuth({
            type: "SUCCESS",
            user: res.user,
            role: res.data.role,
          });
          navigate(path);
        })
        .catch((err) => {
          console.log(`Error logging in with Google with ${err.message}`);
        });
    });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      {loading ? (
        <Loader className="text-white scale-150" />
      ) : (
        <div className="bg-white p-5 sm:p-10 max-w-lg">
          <form
            onSubmit={handleSubmit(
              objective === "Login" ? handleLogin : handleSignup
            )}
          >
            <h1 className="text-center text-3xl sm:text-5xl font-bold font-exo mb-7">
              {objective}
            </h1>
            {objective === "Signup" && (
              <>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name*"
                  className="input border-secondary w-full mb-3 rounded-none py-5 sm:py-7"
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
                <input
                  type="text"
                  placeholder="Image URL"
                  {...register("image", { required: true })}
                  className="input border-secondary w-full mb-3 rounded-none py-5 sm:py-7"
                />
                {errors.image && (
                  <span className="text-red-600">This field is required</span>
                )}
              </>
            )}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email*"
              className="input border-secondary w-full mb-3 rounded-none py-5 sm:py-7"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password*"
              className="input border-secondary w-full rounded-none py-5 sm:py-7"
            />
            {errors.password && (
              <span className="text-red-600">This field is required</span>
            )}
            {objective === "Login" ? (
              <span>
                Don&apos;t have an account?{" "}
                <Link
                  className="text-primary font-bold underline underline-offset-2"
                  to="/signup"
                >
                  Sign up
                </Link>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <Link
                  className="text-primary font-bold underline underline-offset-2"
                  to="/login"
                >
                  Login
                </Link>
              </span>
            )}
            <input
              className="btn w-full mt-6 rounded-none min-h-0 h-12 sm:h-14 text-lg bg-gradient-to-tr from-primary to-secondary text-white"
              type="submit"
              value={objective}
            />
          </form>
          <div className="divider my-8">OR login with</div>
          <button
            onClick={handleGoogleLogin}
            className="btn w-full text-lg border-primary border-2 h-14 rounded-none"
          >
            <FaGoogle />
            Google
          </button>
        </div>
      )}
    </div>
  );
};

AuthForm.propTypes = {
  objective: PropTypes.string,
};

export default AuthForm;
