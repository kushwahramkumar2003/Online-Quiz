import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewQuiz } from "../../services/quiz";
import "./CreateNewQuiz.css"; 

const CreateNewQuiz = ({ setIsOpen }) => {
  
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title, description, category }) => {
      return createNewQuiz({ title, description, category });
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
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data, error) => {
    const { title, description, category } = data;
    // console.log(data);
    mutate({ title, description, category });
  };

  return (
    <div className="text-black">
      <h1 className="createNew">Create new Quiz</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-control">
          <label htmlFor="title" >Quiz Title</label>
          <input 
          className="input-box"
            type="text"
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
        <div className="form-control">
          <label htmlFor="description">Quiz Description</label>
          <input 
           className="input-box"
            type="text"
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
        <div className="form-control">
          <label htmlFor="category">Quiz Category</label>
          <input 
           className="input-box"
            type="text"
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
        <button
          type="submit"
          className="submit-button"
          disabled={!isValid || isLoading}
          typeof="submit"
        >
          Save
        </button>
        <button onClick={() => setIsOpen(false)}  className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default CreateNewQuiz;
