import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";  // ✅ fixed spelling

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);  // ✅ fixed

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      setUser(response.data.user);  // ✅ updates global context
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    }

    // clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 flex flex-col h-screen justify-between">
        <form onSubmit={submitHandler}>
          <img
            className="w-16 mb-10"
            src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
            alt="logo"
          />

          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-6">
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First name"
              required
            />
            <input
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email & number</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@gmail.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            required
          />

          <button
            type="submit"
            className="bg-[#111] text-[#fff] font-semibold mb-2 rounded px-4 py-2 w-full text-lg"
          >
            Create account
          </button>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/user/login" className="text-blue-600">
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
  );
};

export default UserSignup;
