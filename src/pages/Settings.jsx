import React from "react";
import { useDispatch} from 'react-redux';
import { setTheme } from '../store/themeSlice' 

const Settings = ({ isVisible }) => {
  const dispatch = useDispatch();


  return (
    <div
      className={`${
        isVisible ? "w-4/5 right-0" : "w-full "
      } mt-16 p-2 grid grid-cols-3 gap-2 justify-center absolute z-0  h-screen duretion-300`}
    ><section className="col-span-3 text-sm md:text-md lg:text-2xl flex items-center justify-center">
            CHOOSE A THEME
    </section>
        <section className="border h-1/2 sm:col-span-3 md:col-span-1 rounded-lg bg-indigo-400 text-white p-2 flex items-center cursor-pointer"  onClick={()=>dispatch(setTheme("indigo"))}> 
            <span className="flex items-center justify-center h-full bg-indigo-700 w-full">indigo</span>
        </section>
        <section className="border h-1/2 sm:col-span-3 md:col-span-1 rounded-lg bg-red-400 text-white p-2 flex items-center cursor-pointer"  onClick={()=>dispatch(setTheme("red"))}> 
            <span className="flex items-center justify-center h-full bg-red-700 w-full">Red</span>
        </section>
        <section className="border h-1/2 sm:col-span-3 md:col-span-1 rounded-lg bg-emerald-400 text-white p-2 flex items-center cursor-pointer" onClick={()=>dispatch(setTheme("emerald"))}> 
            <span className="flex items-center justify-center h-full bg-emerald-700 w-full">Emerald</span>
        </section>
    </div>
  );
};

export default Settings;
