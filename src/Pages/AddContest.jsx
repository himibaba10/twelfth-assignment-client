import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";

const contests = [
  { name: "Select contest type", disabled: true },
  { name: "Business Contest" },
  { name: "Medical Contest" },
  { name: "Article Writing" },
  { name: "Gaming" },
];

const AddContest = () => {
  const [selected, setSelected] = useState(contests[0]);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();

  // Get today's date to set the min value of html date tag
  const today = new Date().toISOString().split("T")[0];

  const handleAddContest = (data) => {
    setError("");
    if (selected.disabled) {
      return setError("Please select the contest type");
    }
    const inputData = {
      ...data,
      type: selected.name,
      email: user?.email,
      user: user.displayName,
      status: "pending",
      participants: 0,
      winner: null,
    };
    setAdding(true);
    axiosPublic
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_API_KEY
        }`,
        { image: inputData.image[0] },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        axiosPublic
          .post("/add-contest", {
            ...inputData,
            image: res.data.data.display_url,
          })
          .then((res) => {
            if (res.data.insertedId) {
              setAdding(false);
              reset();
              setSelected(contests[0]);
              Swal.fire({
                title: "Successful!",
                text: "You added the contest successfully!",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(`Error adding new contest with ${err.message}`);
            setAdding(false);
          });
      });
  };

  return (
    <div className="py-10 px-2.5 bg-gradient-to-tr from-primary to-secondary min-h-screen flex justify-center items-center">
      {adding ? (
        <Loader className="text-white scale-150" />
      ) : (
        <div className="bg-white p-5 sm:p-10 w-full max-w-2xl">
          <form
            className="flex flex-wrap gap-2 justify-between"
            onSubmit={handleSubmit(handleAddContest)}
          >
            <h1 className="w-full text-center text-3xl sm:text-5xl font-bold font-exo mb-5">
              Add Contest
            </h1>
            <div className="w-full">
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Contest Name*"
                className="input border-secondary w-full rounded-none py-5 sm:py-7"
              />
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full lg:w-[32.43%]">
              <input
                type="text"
                {...register("price", { required: true })}
                placeholder="Contest Price(USD)*"
                className="input border-secondary w-full rounded-none py-5 sm:py-7"
              />
              {errors.price && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full lg:w-[32.43%]">
              <input
                type="text"
                {...register("prizeMoney", { required: true })}
                placeholder="Contest Prize Money(USD)*"
                className="input border-secondary w-full rounded-none py-5 sm:py-7"
              />
              {errors.prizeMoney && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <Listbox
              className="w-full lg:w-[32.43%]"
              value={selected}
              onChange={setSelected}
            >
              <div className="relative">
                <Listbox.Button className="relative w-full border border-secondary cursor-default rounded-none bg-white py-3 sm:py-4 pl-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                  <span
                    className={`block truncate ${
                      selected.disabled ? "text-gray-400" : null
                    }`}
                  >
                    {selected.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaAngleDown />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {contests.map((contest, contestIdx) => (
                      <Listbox.Option
                        key={contestIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        disabled={contest.disabled}
                        value={contest}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {contest.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
                <span className="text-red-600">{error}</span>
              </div>
            </Listbox>
            <div className="w-full lg:w-[49.3%]">
              <input
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
                className="file-input file-input-bordered border-primary w-full sm:h-[57px] rounded-none"
              />
              {errors.image && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full lg:w-[49.3%]">
              <input
                type="date"
                {...register("deadline", { required: true })}
                className="input border-secondary w-full rounded-none py-5 sm:py-7"
                min={today}
              />
              {errors.deadline && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full">
              <textarea
                {...register("instruction", { required: true })}
                className="textarea textarea-bordered w-full rounded-none resize-none border-primary"
                placeholder="Text instruction*"
              ></textarea>
              {errors.instruction && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full">
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full rounded-none resize-none border-primary h-28"
                placeholder="Description*"
              ></textarea>
              {errors.description && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <input
              className="btn w-full mt-6 rounded-none min-h-0 h-12 sm:h-14 text-lg bg-gradient-to-tr from-primary to-secondary text-white"
              type="submit"
              value="Add Contest"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddContest;
