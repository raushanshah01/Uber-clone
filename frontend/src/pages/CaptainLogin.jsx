import React, { useState } from "react";
import { Link } from "react-router-dom";


const CaptainLogin = () => {
  const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [captainData, setCaptainData] = React.useState({});
  
    const submitHandler = (e) => {
      setCaptainData({
        email: email,
        password 
      });
      console.log(userData);
      e.preventDefault();
      setEmail("");
      setPassword("");
    };
  

  return (
    <div>
      <div className="p-7 flex flex-col h-screen justify-between">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <img
            className="w-16 mb-10"
            src="https://w7.pngwing.com/pngs/636/735/png-transparent-logo-uber-brand-design-text-logo-engineering-thumbnail.png"
            alt=""
          />

          <h3 className="text-lg font-medium mb-2">
            What's your email & number
          </h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@gmail.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder: text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="bg-[#111] text-[#fff] font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder: text-base"
          >
            Login
          </button>

          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captain/signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-7 pb-5 bg-white">
        <Link
          to="/user/login"
          type="submit"
          className="bg-[#a0542c] flex items-center justify-center text-[#fff] font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder: text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
