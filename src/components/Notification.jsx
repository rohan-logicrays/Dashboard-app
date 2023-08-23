import React from 'react'
import { useSelector } from 'react-redux';

const Notification = ({isNotifiaction}) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div
      className={`bg-${theme}-500 text-white absolute right-0 z-10 duration-200 ease-in-out rounded-lg  ${
        isNotifiaction ? "translate-y-16  opacity-1" : " -translate-y-44 opacity-0"
      } w-[12rem] p-2 grid  justify-center items-center`}
    >
     
      <span className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600`} >New Email From Paras</span>
      <span className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600`} >New Email From Paras</span>
      <span className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600`} >New Email From Paras</span>
      
    </div>
  )
}

export default Notification