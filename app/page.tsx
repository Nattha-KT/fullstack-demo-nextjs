
import Link from "next/link";
async function fetchBlog(){
  const res = await fetch("http://localhost:3000/api/blog",{
    next: {
      revalidate: 10
    }
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlog();
  console.log(posts);

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2 font-extrabold font-[verdana]">
        Full Stack Test With Next.js</h1>
      </div>
      {/* Link to add sheet */}
      <div className="flex my-5">
          <Link href={"/sheet/add"} className="md:w-1/6 sm:w-2/4 rounded-md text-center p-2 m-auto bg-slate-200">
            Add New Sheet ➕🤗
          </Link>

        </div>
        {/* Show more */}
        <div className="w-full  flex flex-col justify-center items-center">
          {posts?.map((post:any)=>(
            <div className=" w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
              {/* Title and Course code */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.title}</h2>
                </div>
                <Link href={`/sheet/edit/${post.id}`} className="rounded px-4 py-2 text-center text-xl bg-slate-900 rouned-md font-semibold text-slate-200">
                  Edit
                </Link>
              </div>
              {/* Date and Time */}
              <div className="mr-auto my-1">
                <blockquote className="font-bold text-slate-700">
                  {new Date(post.date).toDateString()} 
                </blockquote>
              </div>
              <div className="mr-auto my-1 text-sm /2">
                <h1>{post.description}</h1>
              </div>
            </div>
          ))}
        </div>
        


    </main>
  )
}







