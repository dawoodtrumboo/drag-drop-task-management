import { StoreContext } from "@/app/context/context";
import { signin } from "@/services/authApi";
import { GooglePlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
const Login: React.FC = () => {
  const [signinForm, setSigninForm] = React.useState({
    email: "",
    password: "",
  });
  const [signinError, setSigninError] = React.useState([]);
  const {
    setAuth,
    loading,
    error: errorPopup,
    messageApi,
  } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnSubmit = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    loading();
    try {
      console.log("asdas");
      const data = await signin(signinForm);
      console.log(data);
      if (data.message) {
        if (data.errors?.length > 0) {
          setSigninError(data.errors);
        } else {
          setSigninError([data.message]);
        }
      } else {
        setAuth(data);
        localStorage.setItem("userDetails", JSON.stringify(data));
        router.push("/tasks");
      }
    } catch (error) {
      errorPopup(error.message);
    } finally {
      setIsLoading(false);
      messageApi.destroy();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSigninForm({
      ...signinForm,
      [e.target.name]: value,
    });
  };
  return (
    <div className="form-container sign-in-container ">
      <form>
        <h1 className="text-black text-3xl font-bold">Sign In</h1>
        <div className="social-container">
          <a
            className="social"
            href={`https://server.dawoodtrumboo.com/auth/google`}
          >
            <GooglePlusOutlined className="text-[#333] text-lg" />
          </a>
        </div>
        <span className="text-[#333] text-xs">or use your account</span>
        <div className="space-y-4 mt-3 mb-9">
          <input
            className="py-2 px-3 text-sm"
            type="email"
            placeholder="Email"
            name="email"
            value={signinForm.email}
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 text-sm"
            type="password"
            name="password"
            placeholder="Password"
            value={signinForm.password}
            onChange={handleChange}
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

        <Button
          onClick={(e) => handleOnSubmit(e)}
          loading={isLoading}
          className="bg-[#438ACC] text-white font-bold px-[45px] py-[10px] uppercase transition-transform 80ms ease-in rounded-full text-xs hover:bg-[#438ACC] hover:text-white"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
