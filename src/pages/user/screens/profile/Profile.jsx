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
    mutationFn: ({
      name,
      email,
      password,
      bio,
      Birthday,
      Phone,
      Address,
      City,
      State,
      Zip,
      Country,
      Institute,
      Education,
      Skills,
      Languages,
    }) => {
      return updateProfile({
        userData: {
          name,
          email,
          password,
          bio,
          Birthday,
          Phone,
          Address,
          City,
          State,
          Zip,
          Country,
          Institute,
          Education,
          Skills,
          Languages,
        },
      });
    },
    onSuccess: (data) => {
      // dispatch(userActions.setUserInfo(data));
      // localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["user-profile"]);
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
        name: profileIsLoading ? "" : profileData?.name,
        email: profileIsLoading ? "" : profileData?.email,
        password: "",
        bio: profileIsLoading ? "" : profileData?.bio,
        Birthday: profileIsLoading ? "" : profileData?.Birthday,
        Phone: profileIsLoading ? "" : profileData?.Phone,
        Address: profileIsLoading ? "" : profileData?.Address,
        City: profileIsLoading ? "" : profileData?.City,
        State: profileIsLoading ? "" : profileData?.State,
        Zip: profileIsLoading ? "" : profileData?.Zip,
        Country: profileIsLoading ? "" : profileData?.Country,
        Institute: profileIsLoading ? "" : profileData?.Institute,
        Education: profileIsLoading ? "" : profileData?.Education,
        Skills: profileIsLoading ? "" : profileData?.Skills,
        Languages: profileIsLoading ? "" : profileData?.Languages,
      };
    }, [
      profileData?.email,
      profileData?.name,
      profileIsLoading,
      profileData?.bio,
      profileData?.Birthday,
      profileData?.Phone,
      profileData?.Address,
      profileData?.City,
      profileData?.State,
      profileData?.Zip,
      profileData?.Country,
      profileData?.Institute,
      profileData?.Education,
      profileData?.Skills,
      profileData?.Languages,
    ]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const {
      name,
      email,
      password,
      bio,
      Birthday,
      Phone,
      Address,
      City,
      State,
      Zip,
      Country,
      Institute,
      Education,
      Skills,
      Languages,
    } = data;
    mutate({
      name,
      email,
      password,
      bio,
      Birthday,
      Phone,
      Address,
      City,
      State,
      Zip,
      Country,
      Institute,
      Education,
      Skills,
      Languages,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div>
        <ProfilePicture avatar={userState?.userInfo?.avatar} />
      </div>
      <div>
        {/* <p>Additional Details</p> */}
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
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="bio" className="text-[#5a7184] font-semibold block">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              {...register("bio", {
                minLength: {
                  value: 1,
                  message: "Bio length must be at least 1 character",
                },
              })}
              placeholder="Enter your Bio"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.bio ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.bio?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.bio?.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="birthday"
              className="text-[#5a7184] font-semibold block"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              {...register("birthday")}
              placeholder="Enter your Birthday"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.birthday ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.birthday?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.birthday?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="phone"
              className="text-[#5a7184] font-semibold block"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="Enter your Phone no."
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.phone ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.phone?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="address"
              className="text-[#5a7184] font-semibold block"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              placeholder="Enter your Address"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.address ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.address?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="city"
              className="text-[#5a7184] font-semibold block"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              placeholder="Enter your City name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.city ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.city?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.city?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="state"
              className="text-[#5a7184] font-semibold block"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              {...register("state")}
              placeholder="Enter your State name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.state ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.state?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.state?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="zip" className="text-[#5a7184] font-semibold block">
              Zip code
            </label>
            <input
              type="text"
              id="zip"
              {...register("zip")}
              placeholder="Enter your Zip code"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.zip ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.zip?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.zip?.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="country"
              className="text-[#5a7184] font-semibold block"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country")}
              placeholder="Enter your Country name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.country ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.country?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.country?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="institute"
              className="text-[#5a7184] font-semibold block"
            >
              Institute
            </label>
            <input
              type="text"
              id="institute"
              {...register("institute")}
              placeholder="Enter your Institute name"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.institute ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.institute?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.institute?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="education"
              className="text-[#5a7184] font-semibold block"
            >
              Education
            </label>
            <input
              type="text"
              id="education"
              {...register("education")}
              placeholder="Enter your Education"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.education ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.education?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.education?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="skills"
              className="text-[#5a7184] font-semibold block"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              {...register("skills")}
              placeholder="Enter your Skills"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.skills ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.skills?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.skills?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-6">
            <label
              htmlFor="languages"
              className="text-[#5a7184] font-semibold block"
            >
              Languages
            </label>
            <input
              type="text"
              id="languages"
              {...register("languages")}
              placeholder="Enter your Languages"
              className={`profile-inputs placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                errors.languages ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.languages?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.languages?.message}
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
