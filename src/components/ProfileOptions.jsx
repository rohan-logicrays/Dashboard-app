import { useSelector } from 'react-redux';

const ProfileOptions = ({ isProfile }) => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <div
      className={`bg-${theme}-500 text-white absolute z-10 right-12 duration-200 ease-in-out rounded-lg  ${
        isProfile ? "translate-y-16 visible opacity-1" : " -translate-y-16 opacity-0"
      } w-[12rem] p-2 grid  justify-center items-center`}
    >
     
      <button className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600`}>Profile </button>
      <button className={`bg-${theme}-700 w-40 p-1 my-1 rounded-lg hover:bg-${theme}-600`}>Log out </button>
    </div>
  );
};

export default ProfileOptions;
