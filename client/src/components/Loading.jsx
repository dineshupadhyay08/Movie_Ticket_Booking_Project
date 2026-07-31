import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

const Loading = () => {

  const { nextUrl } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(nextUrl){
      setTimeout(()=>{
        navigate(nextUrl)
      }, 6000)
    }
  },[])

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='animate-spin rounded-full h-1/4 w-14 border-2 border-t-primary'></div>
    </div>
  )
}

export default Loading
