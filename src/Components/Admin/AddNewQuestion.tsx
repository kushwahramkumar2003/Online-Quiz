import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addQuestionInQuiz } from "../../services/quiz";

type addQuestionArgument = {
  question: string;
  options: string[];
  correctAnswer: string;
  quizId: string;
};

const AddNewQuestion = ({ quizId, setIsOpen }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [answer, setAnswer] = useState("");

  const [options, setOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
  ]);

  const { mutate } = useMutation({
    mutationFn: ({
      question,
      options,
      correctAnswer,
      quizId,
    }: addQuestionArgument) => {
      return addQuestionInQuiz({ question, options, correctAnswer, quizId });
    },
    onSuccess: (data) => {
      toast.success("Question added successfully");
      setIsOpen(false);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const handleOptionChange = (option, value) => {
    setSelectedOption(option);
    setAnswer(value);
  };

  const handleInputChange = (id, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value } : option
      )
    );

    setValue(`option${id}`, value);
  };

  const onSubmit = (data) => {
    console.log("data : ", data);
    const { question, option1, option2, option3, option4 } = data;
    const optionsArr: string[] = [option1, option2, option3, option4];
    mutate({
      question,
      options: optionsArr,
      correctAnswer: answer,
      quizId,
    });
  };

  return (
    <div className="text-black">
      <h1>Add new Question</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              id="question"
              {...register("question", { required: "Question is required" })}
            />
            {errors.question && <p>{errors?.question?.message.toString()}</p>}
          </div>
          <div className="form-control">
            <label>Options:</label>
            {options.map((option) => (
              <div key={option.id}>
                <Controller
                  name={`option${option.id}`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <input
                        type="radio"
                        id={`option${option.id}`}
                        name="options"
                        value={`option${option.id}`}
                        checked={selectedOption === `option${option.id}`}
                        onChange={() =>
                          handleOptionChange(`option${option.id}`, field.value)
                        }
                      />
                      <label htmlFor={`option${option.id}`}>
                        Option {option.id}
                      </label>
                      <input
                        type="text"
                        id={`option${option.id}`}
                        {...field}
                        onChange={(e) =>
                          handleInputChange(option.id, e.target.value)
                        }
                      />
                    </>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="form-control">
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              id="answer"
              value={answer}
              readOnly
              {...register("answer", { required: "Answer is required" })}
            />
            {errors.answer && <p>{errors?.answer?.message.toString()}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewQuestion;
