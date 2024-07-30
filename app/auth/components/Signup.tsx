import React, { useContext, useEffect } from "react";
import { GooglePlusOutlined } from "@ant-design/icons";
import { StoreContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import { signup } from "@/services/authApi";
const Signup: React.FC = () => {
  const [signupForm, setSignupForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [signinError, setSigninError] = React.useState([]);
  const {
    setAuth,
    loading,
    error: errorPopup,
    messageApi,
  } = useContext(StoreContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignupForm({
      ...signupForm,
      [e.target.name]: value,
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loading();
    try {
      const user = await signup(signupForm);
      if (user.message == "Validation failed") {
        if (user.errors?.length > 0) {
          setSigninError(user.errors);
        } else {
          setSigninError([user.message]);
        }
      } else {
        setAuth(user);
        localStorage.setItem("userDetails", JSON.stringify(user));
        router.push("/tasks");
      }
    } catch (error) {
      errorPopup(error.message);
    } finally {
      messageApi.destroy();
    }
  };

  return (
    <div className="form-container sign-up-container ">
      <form onSubmit={handleOnSubmit}>
        <h1 className="text-black text-3xl font-bold">Create Account</h1>
        <div className="social-container">
          <a
            className="social"
            href={`https://server.dawoodtrumboo.com/auth/google`}
          >
            <GooglePlusOutlined className="text-[#333] text-lg" />
          </a>
        </div>
        <span className="text-[#333] text-xs">
          or use your email for registration
        </span>
        <div className="space-y-4 my-3">
          <input
            className="py-2 px-3 text-sm"
            type="text"
            name="name"
            value={signupForm.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="py-2 px-3 text-sm"
            type="email"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="py-2 px-3 text-sm"
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <ul className="text-start">
            {signinError.length > 0 &&
              signinError.map((error) => (
                <li key={error} className="text-red-500 text-xs list-disc">
                  {error}
                </li>
              ))}
          </ul>
        </div>

        <button className="bg-[#438ACC] text-white font-bold px-[45px] py-[10px] uppercase transition-transform 80ms ease-in rounded-full text-xs">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
