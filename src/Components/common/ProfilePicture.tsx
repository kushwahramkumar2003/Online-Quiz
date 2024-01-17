import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { createPortal } from "react-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CropEasy from "../crop/CropEasy.jsx";
import { updateProfilePicture } from "../../services/profile.js";
import { userActions } from "../../store/reducers/userReducers.js";
import { RootState } from "../../store/types.js";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto({ url: URL.createObjectURL(file), file });
      setOpenCrop(true);
    }
  };
  // eslint-disable-next-line
  const { mutate } = useMutation({
    mutationFn: ({ formData }: { token: string; formData: FormData }) => {
      return updateProfilePicture({
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success("Profile Photo is Removed");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="flex items-center justify-center w-full p-1 gap-x-4">
        <div className="relative w-20 h-20 overflow-hidden rounded-full outline outline-offset-2 outline-1 lutline-primary">
          <label
            htmlFor="profilePicture"
            className="absolute inset-0 bg-transparent rounded-full cursor-pointer"
          >
            {avatar ? (
              <img
                src={avatar}
                alt="profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-blue-50/50">
                <HiOutlineCamera className="h-auto w-7 text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="px-6 py-1.5  text-red-500 border border-red-500 rounded-lg"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
