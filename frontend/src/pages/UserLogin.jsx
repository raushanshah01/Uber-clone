import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";  // ✅ fixed spelling
import axios from "axios";


const UserLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState({});

  const { user, setUser } = useContext(UserDataContext);  // ✅ fixed
  const navigate = useNavigate();

  const submitHandler =async (e) => {
    e.preventDefault();


    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      setUser(response.data.user);  // ✅ updates global context
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    }


    // console.log(userData);
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
            src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
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
            New here?{" "}
            <Link to="/user/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-7 pb-5 bg-white">
        <Link to='/captain/login'
          type="submit"
          className="bg-[#10b461] flex items-center justify-center text-[#fff] font-semibold mb-7  rounded px-4 py-2 w-full text-lg placeholder: text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
