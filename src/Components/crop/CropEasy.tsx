import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
// eslint-disable-next-line
import { updateProfilePicture } from "../../services/profile";

const CropEasy = ({ photo, setOpenCrop }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const hadleCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return updateProfilePicture({
        formData: formData,
      });
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      toast.success("Profile Photo is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(photo?.url, croppedAreaPixels);

      console.log(croppedImage);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const file = new File([croppedImage?.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      console.log("file : ", file);
      formData.append("profilePicture", file);
      mutate({ formData: formData });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-auto">
      <div className="w-full bg-white h-fit sm:max-w-[350px] p-5 rounded-lg ">
        <h2 className="mb-2 font-semibold text-Dark-hard ">Crop Image</h2>
        <div className="relative w-full overflow-hidden rounded-lg aspect-square ">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={hadleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom : {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            name="zoomRange"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e?.target?.value))}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex flex-wrap justify-between gap-2">
          <button
            className="px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm disabled::opacity-70"
            onClick={() => setOpenCrop(false)}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg text-white border text-sm disabled::opacity-70 bg-blue-500"
            onClick={handleCropImage}
          >
            {isPending ? (
              <PulseLoader color="#fff" size={10} />
            ) : (
              "Crop & Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
