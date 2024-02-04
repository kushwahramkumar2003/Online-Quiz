import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useMemo } from "react";
import { PulseLoader } from "react-spinners";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../../../../services/user.js";
import { userActions } from "../../../../store/reducers/userReducers.js";
import ProfilePicture from "../../../../Components/common/ProfilePicture.js";
import "./My_profile.css";
import { RootState } from "../../../../store/types.js";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state: RootState) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    // eslint-disable-next-line
    // error: profileError,
  } = useQuery({
    queryFn: () => {
      return getAdminProfile();
    },
    queryKey: ["profile"],
  });

  console.log("getAdminProfile : ", profileData);

  const { mutate, isPending: updateProfileIsLoading } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return updateAdminProfile({
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
        password: "",
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <section
      className="container admin-profile-section"
      style={{ all: "unset" }}
    >
      <div className="profile-heading">
        <h1>My Profile</h1>
      </div>

      <div className="w-full max-w-sm ml-[26rem] pt-4 admin-profile-content">
        <ProfilePicture avatar={profileData?.avatar} />

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
                {errors?.name?.message.toString()}
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
                {errors?.email?.message.toString()}
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
                errors?.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors?.password?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors?.password?.message}
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
    </section>
  );
};

export default MyProfile;
