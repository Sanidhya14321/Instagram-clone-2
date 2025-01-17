import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
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
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className=" shadow-lg  gap-5 p-8"
      >
        <div className="my-4 flex flex-col">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className=" text-sm">Signup to chat and meet People</p>
          <div>
            <span className="font-medium">Username</span>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              className=" focus-visible:ring-transparent my-2"
            />
          </div>
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
              <Button type="submit">Signup</Button>
            )
          }
          <span className="text-center">Already have an account?<Link to='/login' className='text-blue-600'>Login</Link></span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
