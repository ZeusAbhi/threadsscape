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
      .post("http://localhost:5000/users/signin", {
        email: data.email,
        password: data.password,
      })
      .then((res) =>{
        localStorage.setItem("User", JSON.stringify({"id": res.data.user._id, "token": res.data.token}));
        window.location.href = '/home'
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[80vh] items-center justify-center"
      >
        <div className="flex h-[70vh] w-[70vw] gap-3  rounded-[1rem] border-2 bg-black px-3 pr-0">
          <div className="flex h-[40vh] w-[30vw] flex-col  gap-8 ">
            <h1 className="my-4 break-normal text-4xl font-bold text-white">
              Login <br></br>to Threadscape
            </h1>
            <h4 className="-my-2 text-white ">
              Not a member?{" "}
              <Link className="text-blue-500 " href="/signup">
                Signup
              </Link>
            </h4>

            <label className="text-white">Email</label>
            <input
              className=" transition:bg h-[5vh] w-[20vw] rounded-lg bg-white text-center outline-none hover:bg-slate-100"
              type="email"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <label className="text-white">Password</label>
            <input
              className=" transition:bg h-[5vh] w-[20vw] rounded-lg bg-white  text-center outline-none hover:bg-slate-100"
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
              className="h-10 w-20  cursor-pointer rounded-md  bg-blue-600 text-white transition-all hover:bg-blue-700"
              type="submit"
              value="Login"
              {...register('submit')}
            />

            {error.length > 0 && <p className="-my-2 text-red-500">{error}</p>}
          </div>
          <div
            className=" w-[40vw] rounded-full bg-cover  bg-center"
            style={{ backgroundImage: "url('flash.avif')" }}
          ></div>
        </div>
      </form>
    </>
  );
};

export default Login;
