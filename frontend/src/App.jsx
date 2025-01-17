import Home from "./components/Home";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Signup from "./components/Signup";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const browserRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      }
    ]
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
