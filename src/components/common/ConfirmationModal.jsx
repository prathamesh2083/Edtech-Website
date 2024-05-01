import React from 'react'
import IconBtn from './IconBtn'
export default function ConfirmationModal({modalData}) {
  return (
    <div className='!mt-0 grid bg-opacity-50 backdrop-blur-sm z-1000   gap-4 m-auto absolute left-[40%] top-[30%] bg-black overflow-auto  border-[1px] place-items-center border-richblack-600 rounded-lg p-8 px-10' >
       
            <p className='text-[2rem] font-semibold' >{modalData.text1} </p>
            <p>{modalData.text2} </p>
            
            <div className='w-full flex justify-around' >
               <IconBtn onClick={modalData?.btn1handler} text={modalData?.btntext1} active={true} ></IconBtn>
               <IconBtn onClick={modalData?.btn2handler} text={modalData?.btntext2} ></IconBtn>
               
            </div>
        
    </div>
  )
}
