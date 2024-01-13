import React, { useMemo } from "react";
import ProfilePicture from "../../../../Components/common/ProfilePicture";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../../../services/profile";
import { userActions } from "../../../../store/reducers/userReducers";
import { toast } from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    // eslint-disable-next-line
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getProfile();
    },
    queryKey: ["user-profile"],
  });

  const { mutate, isPending: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      Birthday: "",
      Phone: "",
      Address: "",
      City: "",
      State: "",
      Zip: "",
      Country: "",
      Institute: "",
      Education: "",
      Skills: "",
      Languages: "",
    },
    values: useMemo(() => {
      return {
        // name: profileIsLoading ? "" : profileData.name,
        // email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div>
        <ProfilePicture avatar={userState?.userInfo?.avatar} />
      </div>
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter your name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter your email"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              New Password (optional)
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter new password"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || profileIsLoading || updateProfileIsLoading}
            className="profile-update-btn w-full px-4 py-2.5 mb-6 text-lg font-bold text-white bg-blue-700 rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {updateProfileIsLoading ? (
              <PulseLoader color="#fff" size={10} />
            ) : (
              "Update"
            )}
          </button>
        </form>

        <p>Additional Details</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter your name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter your email"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              New Password (optional)
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter new password"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || profileIsLoading || updateProfileIsLoading}
            className="profile-update-btn w-full px-4 py-2.5 mb-6 text-lg font-bold text-white bg-blue-700 rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {updateProfileIsLoading ? (
              <PulseLoader color="#fff" size={10} />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
