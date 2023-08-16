"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

const Signup = () => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/signup`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setError("");
        if (res.status == 201) {
          setAccount(res.data.message);
        }
      })
      .catch((e) => {
        setAccount("");
        setError(e.response.data.message);
      });
  };
  return (
    <>
     
        <div className="flex w-[100vw] fixed gap-3 overflow-y-hidden justify-center items-center">
        <div
            className=" w-[70vw] h-[90vh]  bg-cover  bg-center"
            style={{ backgroundImage: "url('signup3.jpg')" }}
          ></div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[80vh]"
      >
          <div className="flex xl:w-max w-[30vw] xl:overflow-y-scroll overflow-y-auto  flex-col  mx-5   gap-6 ">
            <h1 className="my-4 break-normal text-4xl font-bold text-black">
              Sign Up <br></br>to Threadscape
            </h1>
            <h4 className="text-black -my-2 ">Already a member? <Link className="text-blue-500 " href='/login'>Login</Link></h4>
            <label className="text-black">Name</label>
            <input
              className=" transition:bg xl:w-max h-[5vh] w-[20vw] rounded-lg bg-slate-100  text-center outline-none hover:bg-slate-200 focus:bg-slate-200"
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 80,
              })}
            />
            {errors.name && (
              <p className=" -my-3 text-sm text-red-500">
                Your Name is less than 3 characters
              </p>
            )}

            <label className="text-black">Email</label>
            <input
              className=" transition:bg xl:w-max h-[5vh] w-[20vw] rounded-lg bg-slate-100 text-center outline-none hover:bg-slate-200 focus:bg-slate-200"
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <label className="text-black">Password</label>
            <input
              className=" transition:bg xl:w-max h-[5vh] w-[20vw] rounded-lg bg-slate-100  text-center outline-none hover:bg-slate-200 focus:bg-slate-200"
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 80,
              })}
            />
            {errors.password && (
              <p className=" -my-3 text-sm text-red-500">
                Your password is less than 8 characters
              </p>
            )}

            <input
              className="h-10 w-20  cursor-pointer rounded-md  bg-blue-500 text-white transition-all hover:bg-blue-700"
              type="submit"
              value="Register"
              {...register('submit')}
            />
            {account.length > 0 ? (
              <p className="text-green-500">{account}</p>
            ) : (
              <p className="text-red-500">{error}</p>
            )}
          </div>
          </form>
        </div>
      
    </>
  );
};

export default Signup;
