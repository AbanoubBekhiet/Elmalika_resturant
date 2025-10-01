// src/components/HeroFooterSection.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import FooterBg from '../../assets/footerBG.jpg'

export default function Footer () {
  return (
    <div dir='rtl' className='font-sans'>
      {/* ====== SECTION الصورة + الزر ====== */}
      <section
        className='bg-cover bg-center bg-no-repeat h-72 sm:h-80 md:h-80'
        style={{
          backgroundImage: `url(${FooterBg})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }} // هنا حط مسار الصورة بتاعتك
      >
        <div className='flex flex-col items-center justify-center h-full text-center px-4'>
          <h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight'>
            استعد لطلب أول أوردر معنا
            <br />
            بشحن مجاني
          </h2>
          <Link
            to='/'
            className='mt-6 inline-block bg-[#E63946] hover:bg-[#D62828] text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-md'
          >
            قائمة المنتجات
          </Link>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className='bg-gray-900 text-gray-300 py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {/* العمود الأيمن: عنوان + روابط */}
            <div>
              <h4 className='text-xl font-semibold text-white mb-4'>
                قصر المطبخ
              </h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:underline'>
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    الأقسام
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    القائمة
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    تواصل معنا
                  </a>
                </li>
              </ul>
            </div>

            {/* العمود الأوسط: روابط */}
            <div>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:underline'>
                    عرض اليوم
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    وجبات جاهزة
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    وجبات التحضير
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    وجبة سريعة
                  </a>
                </li>
              </ul>
            </div>

            {/* العمود الأيسر: روابط */}
            <div>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:underline'>
                    من نحن
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    السياسات والخصوصية
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    فريق العمل
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    أحدث الوصفات
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* السطر السفلي */}
          <div className='mt-8 border-t border-gray-700 pt-4 text-xs flex flex-col sm:flex-row items-center justify-between'>
            <p className='mb-2 sm:mb-0'>التواصل عن طريق شركة جوجوبي ويب</p>
            <p>© 2025 قصر المطبخ. كل الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
