import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      // console.log("Email:", email);
      // console.log("Password:", password);
  
      // Here you can add your API call or signup logic
      setFirstName("");
  
      setLastName("");
      setEmail("");
      setPassword("");
      setUserData({
        fullName :{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password,
      });
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
            src="https://w7.pngwing.com/pngs/636/735/png-transparent-logo-uber-brand-design-text-logo-engineering-thumbnail.png "
            alt="logo"
          />

          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="First name"
              required
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's your email & number
          </h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base"
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
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border  text-lg placeholder:text-base"
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
            className="bg-[#111] text-[#fff] font-semibold mb-2 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain/login" className="text-blue-600">
              Login Here
            </Link>
          </p>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-7 pb-5 bg-white">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup