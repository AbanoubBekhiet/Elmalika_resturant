// src/components/HeroSection.jsx
import React from 'react'
import heroBg from '../../assets/HeroBg.png'

const HeroSection = () => {
  return (
    <section dir='rtl' className='bg-white overflow-hidden'>
      <div className='container  mx-auto mt-14 md:mt-0 md:px-4 md:py-5 flex flex-col-reverse md:flex-row items-center '>
        {/* ====== Text ====== */}
        <div className='w-full md:w-1/2 md:mr-[50px] text-center md:text-right'>
          <span className='inline-block bg-[#FFF9E9] text-[#FFC222] px-4 py-1 rounded mb-4'>
            مرحباً بك في مطبخنا الصغير
          </span>
          <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
            استمتع بتجربة طعام استثنائية في كل وجبة نقدمها
            <br />
            مع مكونات طازجة ونكهات فريدة
          </h1>
          <p className='text-lg md:text-xl text-gray-700 mb-8'>
            تشكيلة من الأطباق العالمية والحلويات، نقدم لك تجربة مميزة مباشرة إلى
            منزلك
          </p>
        </div>

        {/* ====== Image ====== */}
        <div className='w-full md:w-1/2 md:p-5 md:mt-14'>
          <img
            src={heroBg}
            alt='Delicious Meal'
            className='w-full h-auto object-cover rounded-md'
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
