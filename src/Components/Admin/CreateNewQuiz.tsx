import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewQuiz } from "../../services/quiz";
import "./CreateNewQuiz.css";

type QuizDataType = {
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
};

type CreateNewQuizArgument = { setIsOpen?: (isOpen: boolean) => void };

const CreateNewQuiz = ({ setIsOpen }: CreateNewQuizArgument) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      title,
      description,
      category,
      duration,
      level,
    }: QuizDataType) => {
      return createNewQuiz({ title, description, category, duration, level });
    },
    onSuccess: (data) => {
      toast.success("Quiz created successfully");
      setIsOpen(false);
      console.log(data);
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
    // watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      level: "easy",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { title, description, category, duration, level } = data;
    // console.log(data);
    mutate({ title, description, category, duration, level });
  };

  return (
    <div className="text-black border-black flex h-screen w-screen mt-5 justify-center items-center transition-all">
      <div className=" h-screen w-screen  items-center justify-evenly">
        <h1 className="createNew ">Create new Quiz</h1>
        <form
          className="form-of-create-new-quiz"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="form-control flex flex-col">
            <label htmlFor="title">Quiz Tittle</label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter quiz tittle"
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title should be atleast 3 characters",
                },
              })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="form-control flex flex-col">
            <label htmlFor="description">Quiz Description</label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter quiz description"
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description should be atleast 3 characters",
                },
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <div className="form-control flex flex-col">
            <label htmlFor="category">Quiz Category</label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter quiz category"
              id="category"
              {...register("category", {
                required: "Category is required",
                minLength: {
                  value: 3,
                  message: "Category should be atleast 3 characters",
                },
              })}
            />
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          <div className="form-control flex flex-col">
            <label htmlFor="duration">Duration</label>
            <input
              className="input-box"
              type="text"
              id="duration"
              placeholder="Enter quiz duration"
              {...register("duration", {
                required: "Duration is required",
                minLength: {
                  value: 1,
                  message: "Duration should be at least 1 number",
                },
              })}
            />
            {errors.duration && <p>{errors.duration.message}</p>}
          </div>

          <div className="form-control" id="quiz-level">
            <label htmlFor="level">Select Quiz Level</label>
            <select
              id="level"
              {...register("level", {
                required: "Level is required",
              })}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.level && <p>{errors.level.message}</p>}
          </div>
          <div className={"flex flex-row justify-between max-w-72 font-bold text-white mt-5"}>
            <button
                type="submit"

                // className="submit-button"
                className={"bg-blue-700 rounded pr-4 pl-4 pt-2 pb-2 cursor-pointer hover:bg-blue-600 disabled:block disabled:divide-sky-400 disabled:cursor"}
                disabled={!isValid || isPending}

                typeof="submit"
            >
              Save
            </button>

            <button onClick={() => setIsOpen(false)}
                    className="bg-slate-700 rounded pr-4 pl-4 pt-2 pb-2 cursor-pointer hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateNewQuiz;
