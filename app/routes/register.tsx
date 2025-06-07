import { Link } from "@remix-run/react";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
          />
        </header>
        <form>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="name"
              placeholder="write your Full Name?"
            />
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              placeholder="write your username?"
            />
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="email"
              name="email"
              placeholder="write your email?"
            />
          </div>
          <div>
            <label className="block mb-1 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              placeholder="write your Password?"
            />
          </div>
          <div>
            <input
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
            />
          </div>
        </form>
        <footer>
          <a
            className="text-indigo-700 hover:text-pink-700 text-sm float-left"
            href="#"
          >
            Forgot Password?
          </a>
          <Link
            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
            to="/"
          >
            I have an account
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
