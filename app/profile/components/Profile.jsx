"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";

import useGetUserData from "../hooks/useGetUserData";
import useLogout from "../../auth/lib/hooks/useLogout";

export default function Profile() {
  const router = useRouter();
  const { userData, userLoading, userError } = useGetUserData();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (userLoading) {
    return <div className="flex">Loading...</div>;
  }

  if (userError) {
    return <div className="flex">Error: {userError}</div>;
  }

  const handleProfilePicEdit = () => {};

  return (
    <div className="container mx-auto max-w-7xl p-4 min-h-screen">
      {userData ? (
        <div className="flex flex-col space-y-2">
          <div className="relative max-w-fit">
            <Image
              src={userData.profilePic || "/default-user-image.svg"} // Change image source
              width={100}
              height={100}
              alt="Profile Image"
            />
            <button
              className="absolute right-0 bottom-0 bg-tertiary rounded-full p-2 cursor-pointer hover:bg-quaternary transition-colors duration-300"
              onClick={handleProfilePicEdit}
            >
              <FaPen />
            </button>
          </div>
          <h2 className="text-3xl">{userData.nickname}</h2>
          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.role || "Add your role"}</p> <FaPen />
          </div>
          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.bio || "Add a short intro to highlight your work."}</p>
            <FaPen />
          </div>
          <button
            className=" max-w-36 py-2 px-4 border-2 border-red-700 rounded-full text-lg text-red-700 font-semibold hover:bg-red-700 hover:text-quaternary transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-600">No user data available</div>
      )}
    </div>
  );
}
