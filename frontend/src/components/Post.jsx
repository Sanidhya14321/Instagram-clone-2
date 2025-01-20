import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [text, setText] = useState("");
  const [open , setOpen]=useState(false)
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className=" cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className=" cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className=" cursor-pointer w-fit">
              Add To Favorites
            </Button>
            <Button variant="ghost" className=" cursor-pointer w-fit">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className=" rounded-sm my-2 w-full aspect-square object-cover"
        src="https://th.bing.com/th/id/OIP.6f5ZEeT1bM05vEOyFk2a7AHaHa?rs=1&pid=ImgDetMain"
        alt="post_image"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          <FaRegHeart size={"24px"} className=" text-red-600" />
          <MessageCircle onClick={()=>setOpen(true)} className=" cursor-pointer hover:text-gray-600" />
          <Send className=" cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className=" cursor-pointer hover:text-gray-600" />
      </div>
      <span className=" font-medium text-sm block mb-2"> 1.2k likes</span>
      <p>
        <span className=" font-medium mr-2">Username</span>
        Caption
      </p>
      <span onClick={()=>setOpen(true)} className=" cursor-pointer text-sm text-gray-400">View all 10 comments</span>
      <CommentDialog open={open} setOpen={setOpen}/>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
