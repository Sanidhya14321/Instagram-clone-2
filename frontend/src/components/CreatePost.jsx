import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFileAsDataURL } from '@/lib/utils'

const CreatePost = ({open,setOpen}) => {

  const [file,setFile]=useState("")
  const [caption,setCaption]=useState("")
  const[imagePreview,setImagePreview]=useState("")
  
  const imageRef=useRef()
  const fileChangeHandler=async (e)=>{
    const file=e.target.files?.[0]
    if(file){
      setFile(file)
      const dataUrl=await readFileAsDataURL(file)
      setImagePreview(dataUrl)
    }
  }
  const createPostHandler=(e)=>{
    e.preventDefault()
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={()=>setOpen(false)}>
        <DialogHeader className=" text-center font-semibold">Create New Post</DialogHeader>
        <div className='flex gap-3 items-center'>
          <Avatar >
            <AvatarImage src="" alt="img"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className=' font-semibold text-xs'>Username</h1>
            <span className=' text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea className=" focus-visible:ring-transparent border-none" placeholder="Write a Caption..."/>
        {
          imagePreview && (
            <div className='w-full h-64 flex items-center justify-center'>
              <img src={imagePreview} alt="preview_img" className='w-full h-full object-cover rounded-md'/>
            </div>
          )
        }
        <input ref={imageRef} type="file" className='hidden' onChange={fileChangeHandler}/>
        <Button onClick={()=>imageRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#1b5982]">Select from Computer</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
