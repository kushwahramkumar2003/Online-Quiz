import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuestionByQuizId } from "../../services/quiz";
import "./UpdateQuestion.css";

type updateQuestionByQuizIdType = {
  question: string;
  options: string[];
  correctAnswer: string;
  quizId: string;
  questionId: string;
};

const UpdateQuestion = ({
  quizId,
  // setIsOpen,
  question,
  options: initialOptions,
  questionId,
  answer: initialAnswer,
  setRefresh,
  setIsEdit,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialAnswer || "");
  const [answer, setAnswer] = useState(initialAnswer || "");

  const [options, setOptions] = useState(
    initialOptions.map((value, id) => ({ id: id + 1, value }))
  );

  useEffect(() => {
    setSelectedOption(initialAnswer);
    setAnswer(initialAnswer);
    setOptions(initialOptions.map((value, id) => ({ id: id + 1, value })));
  }, [initialAnswer, initialOptions]);

  const { mutate } = useMutation({
    mutationFn: ({
      question,
      options,
      correctAnswer,
      quizId,
    }: updateQuestionByQuizIdType) => {
      return updateQuestionByQuizId({
        question,
        options,
        correctAnswer,
        quizId,
        questionId,
      });
    },
    onSuccess: (data) => {
      toast.success("Question updated successfully");
      setIsEdit(false);
      setRefresh((prev) => !prev);
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
    const { question, option1, option2, option3, option4 } = data;
    mutate({
      question,
      options: [option1, option2, option3, option4],
      correctAnswer: answer,
      quizId,
      questionId,
    });
  };

  return (
    <div className="all-update-content">
      <div className="text-black update-big-box">
        <h1>Edit Question</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control" id="answer-box">
              <label htmlFor="question">Question:</label>
              <input
                className="update-input-box"
                // type="text"
                id="question"
                {...register("question", { required: "Question is required" })}
                defaultValue={question}
              />
              {errors.question && <p>{errors?.question?.message.toString()}</p>}
            </div>

            <div className="form-control">
              {/* <label>Options:</label> */}
              {options.map((option) => (
                <div key={option.id}>
                  <Controller
                    name={`option${option.id}`}
                    control={control}
                    defaultValue={option.value}
                    render={({ field }) => (
                      <>
                        <div className="options-boxs">
                          <label
                            className="label-box"
                            htmlFor={`option${option.id}`}
                          >
                            Option {option.id}
                          </label>

                          <div className="input-radio">
                            <input
                              type="radio"
                              id={`option${option.id}`}
                              name="options"
                              value={`option${option.id}`}
                              checked={selectedOption === `option${option.id}`}
                              onChange={() =>
                                handleOptionChange(
                                  `option${option.id}`,
                                  field.value
                                )
                              }
                            />

                            <input
                              className="update-input-box"
                              // type="text"
                              id={`option${option.id}`}
                              {...field}
                              onChange={(e) =>
                                handleInputChange(option.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="form-control" id="answer-box">
              <label htmlFor="answer">Answer:</label>
              <input
                className="update-input-box"
                type="text"
                id="answer"
                value={answer}
                readOnly
                {...register("answer", { required: "Answer is required" })}
              />
              {errors.answer && <p>{errors?.answer?.message.toString()}</p>}
            </div>

            <div className="submit-cencel-box">
              <button className="Update-btn" type="submit">
                Update
              </button>
              <button
                className="cencel-btn"
                type="button"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
