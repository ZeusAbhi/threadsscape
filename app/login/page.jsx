"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/signin`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem(
          "User",
          JSON.stringify({ id: res.data.user._id, token: res.data.token })
        );
        window.location.href = "/home";
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };
  return (
    <>
      <div className="fixed  flex  w-[100vw] items-center justify-center gap-3 overflow-y-hidden">
        <div
          className=" h-[100vh] w-[70vw]  bg-cover  bg-center"
          style={{ backgroundImage: "url('login3.png')" }}
        ></div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-[80vh] ">
          <div className="mx-5 xl:w-max  flex w-[30vw] flex-col  gap-6   overflow-y-auto ">
            <h1 className="my-4 break-normal text-4xl font-bold text-black">
              Login <br></br>to Threadscape
            </h1>
            <h4 className="-my-2 text-black ">
              Not a member?{" "}
              <Link className="text-blue-500 " href="/signup">
                Signup
              </Link>
            </h4>

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
              value="Login"
              {...register("submit")}
            />

            {error.length > 0 && <p className="-my-2 text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
