"use client";

import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { useRef } from "react";

const AddMoreSheet = async ({title,description}:{title:String,description:String}) => {
  const res = fetch("http://localhost:3000/api/blog",{
    method: "POST",
    body: JSON.stringify({title,description}),
    // @ts-ignore
    "Content-Type":"application/json",
  });
  console.log(res);
  return (await res).json();
};

const AddSheet = () => {
  // const load = () => toast("Sending request... 🚀👩🏾‍🚀",{
  //   position: "top-center",
  //   autoClose: 400,
  //   theme: "dark",
   
  //   });
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(titleRef.current?.value && descriptionRef.current?.value){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const bol = await AddMoreSheet({title:titleRef.current?.value, description:descriptionRef.current?.value,});
      {bol ? 
        toast.success("Added successfully! 🚀✔️",{id:"1"})
      : toast.error("Error ! 🚀✖️");}
      }else toast.error("Error !!  🚀✖️",{id:"1"});
    // notify();
  };

  return (
    <Fragment>
      {/* <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="dark"
      /> */}
      <div className="w-full m-auto flex my-8 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-500 font-bold p-3">Add more sheet Example 🤖</p>
          <form onSubmit={handleSubmit}> 
            <input ref={titleRef} placeholder="Enter Title" type="text" className="rounded-md px-4 py-2 my-2 w-full"/>
            <textarea ref={descriptionRef} placeholder="Enter Description" className="rounded-md px-4 py-2 w-full my-2" style={{ minHeight: '15rem' }}></textarea>
            <button  className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"> 
              Submit
            </button>
          </form>
        </div>
      </div>
   
      <Toaster />
    </Fragment>
  );
};

export default AddSheet;
