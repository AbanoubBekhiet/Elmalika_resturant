// src/components/MobileBanner.jsx
import React from 'react'
import { FaGooglePlay, FaAppStore } from 'react-icons/fa'
// تأكد إنك صمّمت صورة تشمل الخلفية الصفراء، الهاتف، الطبق، القهوة، الدراجة، والزينيّات وحفظتها هنا:
import bannerImg from '../../assets/appBanner.png'

import { SiListmonk } from 'react-icons/si'

export default function MobileBanner () {
  return (
    <section className='py-12 bg-[#F6F7FC]'>
      <div className='container  flex flex-col-reverse lg:flex-row items-center'>
        {/* —————— الصورة على اليسار —————— */}
        <div className='w-full lg:w-1/2 mb-8 lg:mb-0'>
          <img
            src={bannerImg}
            alt='عرض التطبيق'
            className='w-full h-auto object-cover rounded-lg'
          />
        </div>

        {/* —————— المحتوى على اليمين —————— */}
        <div className='w-full lg:w-1/2 text-right md:mr-[50px] lg:pl-12'>
          <h4 className='text-[#EE3A43] md:text-[24px] font-bold mb-6'>
            أفضل تطبيق لتوصيل الطعام
          </h4>
          <h2 className='text-3xl md:text-[36px] font-bold mb-6'>
            توصيل سهل وسريع على مدار 24 ساعه في اليوم
          </h2>

          <ul className='space-y-3 mb-8 text-gray-700'>
            <li className='flex justify-end items-center gap-2'>
              <p className='text-[#555555] text-[18px]'>
                توصيل سريع بدون رسوم إضافية
              </p>

              <span className='text-[#FFD40D]'>
                <SiListmonk />
              </span>
            </li>
            <li className='flex justify-end items-center gap-2'>
              <p className='text-[#555555] text-[18px]'>
                خصومات خاصة على الطلب من التطبيق
              </p>

              <span className='text-[#FFD40D]'>
                <SiListmonk />
              </span>
            </li>
            <li className='flex justify-end items-center gap-2'>
              <p className='text-[#555555] text-[18px]'>
                تابع كل جديد من خلال تطبيق فعال وسهل
              </p>

              <span className='text-[#FFD40D]'>
                <SiListmonk />
              </span>
            </li>
          </ul>

          <div className='flex justify-end space-x-8'>
            <a
              href='#'
              className='flex items-center gap-2 bg-[#FFC222] text-white font-bold py-2 px-12 rounded-xl  transition'
            >
              <FaGooglePlay className='ml-2 text-2xl' />
              Google Play
            </a>
            <a
              href='#'
              className='flex items-center gap-2 bg-black text-white py-4 font-bold px-12 rounded-xl  transition'
            >
              <FaAppStore className='ml-2 text-2xl' />
              App Store
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
