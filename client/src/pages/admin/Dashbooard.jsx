







































Dinesh_Upadhyay_Resume.pdf
PDF
I'm Dinesh Upadhyay, a MERN Stack Developer (Fresher) with strong hands-on experience in building full-stack and real-time web applications using modern JavaScript technologies.

I have completed my BCA and MERN Stack training, and built multiple production-ready projects where I worked across frontend, backend, authentication, APIs, and deployment.

Key highlights:
1. Hands-on experience in full-stack web development using React.js, Node.js, Express.js, and MongoDB.
2. Built real-time applications using WebRTC and Socket.io, including a video conferencing and chat platform.
3. Developed role-based authentication systems using JWT, cookies, and secure REST APIs.
4. Experience deploying applications on Render, Vercel, and Netlify with production-ready configurations.
5. Worked on admin dashboards, CRUD operations, and responsive UI using Tailwind CSS and Bootstrap.

Tech Stack:
• Frontend: React.js, Redux, HTML5, CSS3, Tailwind CSS, Bootstrap  
• Backend: Node.js, Express.js, REST APIs, JWT, Socket.io  
• Databases: MongoDB, MySQL  
• Tools & Platforms: Git, GitHub, Postman, Render, Vercel, Netlify  

🔗 Links:
GitHub: https://github.com/dineshupadhyay08  
Portfolio: https://dinesh-upadhyay-portfolio-jbh1.vercel.app/  
LinkedIn: https://www.linkedin.com/in/dinesh-upadhyay-030487247/  

I’m actively seeking an internship or entry-level MERN / Frontend Developer role where I can contribute, learn, and grow with the team.

Looking forward to hearing from you.

Best regards,  
Dinesh Upadhyay   convert this best version check my resume and edit this 

short message de 

Hi Mandip Sir,

I came across the Frontend Developer Intern opportunity at PitchMatter. I’m a MERN Stack Developer with hands-on experience in React.js, Node.js, MongoDB, Tailwind CSS, REST APIs, and real-time applications.

I recently completed my BCA and built multiple full-stack projects. I would really appreciate any guidance regarding this opportunity, and if possible, a referral or consideration for the role.

GitHub:
Portfolio:

Thank you.
Dinesh Upadhyay


or short 

Hi Mandip Sir,

I came across the Frontend Developer Intern role at PitchMatter. I’m a MERN Stack Developer with hands-on experience in React.js and full-stack projects.

I would really appreciate any guidance regarding the opportunity. If possible, please consider my profile for the role.

GitHub:
Portfolio:

Thank you.
Dinesh Upadhyay


import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'
import BlurCircle from '../../components/BlurCircle'

const Dashbooard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = useState({
    totalBookings : 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser : 0
  })

  const [loading,setLoading] = useState(true)

  const dashboardCards = [
    {title: "Total Booking", value: dashboardData.totalBookings || "0", icon: ChartLineIcon},
    {title: "Total Revenue", value: dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon},
    {title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon},
    {title: "Total Users", value: dashboardData.totalUser || "0", icon: UserIcon},
  ]

  const fetchDashboardData = async () =>{
    setDashboardData(dummyDashboardData)
    setLoading(false)
  };
  useEffect(()=>{
    fetchDashboardData();
  },[]);


  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10" />

        {dashboardData.activeShows.map((show) => (
          <div
            key={show.id}
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img
              src={show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />

            <p className="font-medium p-2 truncate">{show.movie.title}</p>

            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show.showPrice}
              </p>

              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-pretty fill-primary" />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Dashbooard   esme kya error he check kr ke bta 

Code mostly correct hai, but kuch possible errors hain jo runtime me aa sakte hain. Main important issues ye hain:

1. show.movie.vote_average.toFixed(1) Error
Agar vote_average undefined hua to error aayega:

Cannot read properties of undefined (reading 'toFixed')
Fix:

{show.movie.vote_average?.toFixed(1) || "0.0"}
2. show.movie.poster_path
Agar image path undefined hua to image break hogi.

Fix:

src={show.movie?.poster_path}
ya fallback image:

src={show.movie?.poster_path || "/fallback.jpg"}
3. Typo in Component Name
Tumne component ka naam likha hai:

const Dashbooard = ()
Extra o hai (Dashbooard).

Better:

const Dashboard = ()
and export:

export default Dashboard
4. left="-10" in BlurCircle
Ye string hai without unit. Ho sakta component CSS me issue de.

Better:

<BlurCircle top="100px" left="-10px" />
5. Currency Undefined
Agar .env me VITE_CURRENCY nahi hai to undefined show hoga.

Example:

VITE_CURRENCY=₹
6. Possible Map Error
Agar activeShows undefined hua future API response me:

dashboardData.activeShows.map
error de sakta hai.

Safe way:

dashboardData.activeShows?.map((show) => (
Final Recommended Fix Line
Most important:

{show.movie.vote_average?.toFixed(1) || "0.0"}
and

dashboardData.activeShows?.map(...)
Baaki code structure achha hai 👍


Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders   ye dekh ke bta kyu show kr rh ahe 

Ye warning React 19 / ESLint React hooks ki wajah se aa rahi hai because tum useEffect ke andar directly synchronous setState call kar rahe ho.

Tumhara code:

useEffect(()=>{
  fetchDashboardData();
},[]);
and inside:

const fetchDashboardData = async () =>{
  setDashboardData(dummyDashboardData)
  setLoading(false)
};
Yaha issue ye hai ki effect run hote hi turant setState ho raha hai without any async work/API/external sync.

React bol raha:

"Effect ka use external sync ke liye karo, direct render ke turant baad state change mat karo."

Best Fix
Agar data static hai (dummyDashboardData) to useEffect ki zarurat hi nahi hai.

Direct initial state me set karo:

const [dashboardData, setDashboardData] = useState(dummyDashboardData)

const [loading,setLoading] = useState(false)
and remove:

fetchDashboardData
useEffect
Agar Future Me API Call Karoge
Tab ye valid hoga:

useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get("/api/dashboard")

    setDashboardData(res.data)
    setLoading(false)
  }

  fetchData()
}, [])
Kyuki yaha external async system (API) use ho raha hai.

Current Best Version
const Dashbooard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = useState(dummyDashboardData)

  const [loading,setLoading] = useState(false)
Bas itna kar do warning remove ho jayegi 👍


fix code de full

import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import React, { useState } from "react";

import { dummyDashboardData } from "../../assets/assets";

import Loading from "../../components/Loading";
import Title from "../../components/Admin/Title";
import BlurCircle from "../../components/BlurCircle";

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY || "₹";

  // Direct initial state
  const [dashboardData] = useState(dummyDashboardData);

  const [loading] = useState(false);

  const dashboardCards = [
    {
      title: "Total Booking",
      value: dashboardData?.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardData?.totalRevenue || 0,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData?.activeShows?.length || 0,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData?.totalUser || 0,
      icon: UserIcon,
    },
  ];

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0px" />

        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>

                <p className="text-xl font-medium mt-1">
                  {card.value}
                </p>
              </div>

              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-lg font-medium">
        Active Shows
      </p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10px" />

        {dashboardData?.activeShows?.map((show) => (
          <div
            key={show?.id}
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            <img
              src={show?.movie?.poster_path || "/fallback.jpg"}
              alt={show?.movie?.title}
              className="h-60 w-full object-cover"
            />

            <p className="font-medium p-2 truncate">
              {show?.movie?.title}
            </p>

            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency} {show?.showPrice}
              </p>

              <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                <StarIcon className="w-4 h-4 text-pretty fill-primary" />

                {show?.movie?.vote_average?.toFixed(1) || "0.0"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;


