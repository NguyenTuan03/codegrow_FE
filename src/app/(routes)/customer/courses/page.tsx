import Image from 'next/image';
import React from 'react'
import { FaClock, FaPlay, FaUserFriends } from 'react-icons/fa';

type Props = {}
const courses = new Array(6).fill({
  img:'/courses.png',
  description: 'Kiến thức nhập môn IT',
  progress: '50% learning',
  price: '100.000',
  lessons: 9,
  duration: '3h12p'
});
const page = (props: Props) => {
  return (
    <div className="py-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-10">
        Tổng hợp khoá học lập trình tại <span className="text-[#000]">CODEGROW</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 lg:px-20">
        {courses.map((course, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 bg-white"
          >            
            <div className="relative w-full h-[200px]">
              <Image
                src={course.img}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-4 text-center">
              <p className="text-blue-600 font-semibold text-[20px]">{course.description}</p>
              <p className="text-teal-500 text-sm mt-4 mb-[80px]">{course.progress}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaUserFriends />
                  {course.price}
                </div>
                <div className="flex items-center gap-1">
                  <FaPlay />
                  {course.lessons}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock />
                  {course.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page