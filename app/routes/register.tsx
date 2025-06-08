import { ActionFunction } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { UserModel } from "~/models/User";
import { DatabaseConnect } from "~/utils/database";
import bcrypt from "bcrypt";
import { JWTTokenGenerate } from "~/utils/JWTTokenGenerate";
// Action
export const action: ActionFunction = async ({ request }) => {
  //  Connect to the database and create a new user
  await DatabaseConnect();
  const formData = await request.formData();
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const terms = formData.get("terms");
  // Hash the password
  const hashedPassword = await bcrypt.hash(password as string, 10);
  try {
    // Check if all fields are filled
    if (!name || !username || !email || !password) {
      return json({ error: "Missing fields" }, { status: 400 });
    }
    // Check if the user has agreed to the terms and conditions
    if (!terms) {
      return json(
        { error: "You must agree to the terms and conditions" },
        { status: 400 }
      );
    }

    const checkUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (checkUser) {
      return json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      terms,
    });
    await newUser.save();
    //  Generate JWT token
    const token = JWTTokenGenerate(newUser._id.toString());

    return json({
      message: "User created successfully",
      token,
      status: 201,
    });
  } catch (error) {
    console.log("action Error Sdi", error);
    return json({ error: "Something went wrong" }, { status: 500 });
  }
};

const RegisterPage = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = !(navigation.state === "idle");
  const actionData = useActionData<typeof action>();
  // console.log(actionData);
  // Show error message if there's an error
  // if (actionData?.error) {
  //   toast.error(actionData?.error);
  // }

  // // Show success message if there's a success message
  // if (actionData?.message) {
  //   // Set the token as a local storage item
  //   localStorage.setItem("token", actionData?.token);
  //   navigate("/feed");
  //   toast.success(actionData?.message);
  // }

  useEffect(() => {
    if (actionData?.message) {
      // Set the token as a local storage item
      localStorage.setItem("token", actionData?.token);
      toast.success(actionData?.message);
      navigate("/feed");
    }
    if (actionData?.error) {
      toast.error(actionData?.error);
    }
  }, [actionData]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md m-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        <div className="p-6">
          <header className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <svg
                width="64"
                height="64"
                viewBox="0 0 903 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-600 dark:text-primary-400"
              >
                <path d="M814.39 736.55L751.05 699.74..." fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Create your account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join our community today
            </p>
          </header>

          <Form method="POST" className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                type="text"
                name="username"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                type="password"
                name="password"
                placeholder="Create a password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Create Account
            </button> */}
            <button
              type="submit"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link
                to="/"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
