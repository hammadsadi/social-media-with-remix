import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { DatabaseConnect } from "~/utils/database";
import bcrypt from "bcrypt";
import { UserModel } from "~/models/User";
import { JWTTokenGenerate } from "~/utils/JWTTokenGenerate";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMainContext } from "~/context/mainContext";
export const meta: MetaFunction = () => {
  return [
    { title: "Login | SocialApp" },
    { name: "description", content: "Login to your SocialApp account" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  //  Connect to the database and create a new user
  await DatabaseConnect();
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const terms = formData.get("terms");

  try {
    // Check if all fields are filled
    if (!username || !password) {
      return json({ error: "Missing fields" }, { status: 400 });
    }

    const checkUser = await UserModel.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!checkUser) {
      return json({ error: "User not found" }, { status: 400 });
    }

    // Match the password
    const isMatch = await bcrypt.compare(
      password as string,
      checkUser.password
    );
    if (!isMatch) {
      return json({ error: "Invalid credentials" }, { status: 400 });
    }

    //  Generate JWT token
    const token = JWTTokenGenerate(checkUser._id.toString());

    return json({
      message: "User Logged In successfully",
      token,
      status: 200,
    });
  } catch (error) {
    return json({ error: "Something went wrong" }, { status: 500 });
  }
};

export default function Index() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = !(navigation.state === "idle");
  const actionData = useActionData<typeof action>();
  const { fetchUser, user } = useMainContext();

  // const getLoggedInUserInfo = async () => {
  //    fetchUser();
  // };
  // // Fetch user data on component mount
  // useEffect(()=>{

  // }, [])

  useEffect(() => {
    if (actionData?.message) {
      // Set the token as a local storage item
      localStorage.setItem("token", actionData?.token);
      toast.success(actionData?.message);
      fetchUser();
    }
    if (actionData?.error) {
      toast.error(actionData?.error);
    }
  }, [actionData]);

  // Redirect to feed page if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user]);
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
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to your account
            </p>
          </header>

          <Form method="POST" className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="username"
              >
                Username or Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                type="text"
                name="username"
                placeholder="Enter your username or Email"
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
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
