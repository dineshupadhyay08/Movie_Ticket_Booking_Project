import React from 'react'
import { assets } from '../assets/assets';
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className='flex min-h-screen flex-col items-start justify-center gap-4 bg-cover bg-center px-6 pt-28 pb-16 md:px-16 lg:px-36'
      style={{ backgroundImage: `linear-gradient(to right, rgba(9, 9, 11, 0.15), rgba(9, 9, 11, 0.18)), url(${assets.backgroundImage})` }}
    >
      <img src={assets.marvelLogo} alt='' className='mt-20 max-h-11 lg:h-11'/>
      <h1 className='max-w-110 text-5xl font-semibold md:text-[70px] md:leading-18'>Guardians <br/> of the Galaxy</h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <Calendar1Icon className='h-4.5 w-4.5'/>2018
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='h-4.5 w-4.5'/>2h 9m
        </div>
      </div>
      <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to surve, two people meet in London and try to stop a conspiracy.</p>
      <button onClick={()=> navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Explore Movies
        <ArrowRight className='w-5 h-5'/>
      </button>
    </section>
  );
}
export default HeroSection
