import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/")
        toast.success(res.data.message);
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className=" shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4 flex flex-col">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className=" text-sm">Login to chat and meet People</p>
          <div>
            <span className="font-medium">Email</span>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className=" focus-visible:ring-transparent my-2"
            />
          </div>
          <div>
            <span className="font-medium">Password</span>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className=" focus-visible:ring-transparent my-2"
            />
          </div>
          {
            loading?(
              <Button>
                <Loader2 className="mr-2 h-4  w-4 animate-spin"/>
                  Please Wait
              </Button>
            ):(
              <Button type="submit">Login</Button>
            )
          }
          <span className="text-center">Don't have an account?<Link to='/Signup' className='text-blue-600'>Signup</Link></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
