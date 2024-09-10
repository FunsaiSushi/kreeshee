"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import useGetUserData from "../hooks/useGetUserData";
import useLogout from "../../auth/hooks/useLogout";
import ProfilePic from "./ProfilePic";
import EditUserInfoModal from "./EditUserInfoModal"; // Import the modal

export default function Profile() {
  const router = useRouter();
  const { userData, userLoading, userError } = useGetUserData();
  const { logout } = useLogout();
  const [editField, setEditField] = useState(null); // Track which field is being edited
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const openModal = (field) => {
    setEditField(field);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (userLoading) {
    return <div className="flex">Loading...</div>;
  }

  if (userError) {
    return <div className="flex">Error: {userError}</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 min-h-screen">
      {userData ? (
        <div className="flex flex-col space-y-4">
          <ProfilePic userData={userData} />
          <h2 className="text-3xl">
            {userData.nickname || "Add your nickname"}
          </h2>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.role || "Add your role"}</p>
            <FaPen
              onClick={() => openModal("role")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.bio || "Add a short intro to highlight your work."}</p>
            <FaPen
              onClick={() => openModal("bio")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.birthAddress || "Add your birth address"}</p>
            <FaPen
              onClick={() => openModal("birthAddress")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.currentAddress || "Add your current address"}</p>
            <FaPen
              onClick={() => openModal("currentAddress")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.workAddress || "Add your work address"}</p>
            <FaPen
              onClick={() => openModal("workAddress")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>
              {userData.dob
                ? new Date(userData.dob).toLocaleDateString()
                : "Add your date of birth"}
            </p>
            <FaPen
              onClick={() => openModal("dob")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.gender || "Add your gender"}</p>
            <FaPen
              onClick={() => openModal("gender")}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-start items-center space-x-2 text-lg">
            <p>{userData.religion || "Add your religion"}</p>
            <FaPen
              onClick={() => openModal("religion")}
              className="cursor-pointer"
            />
          </div>

          <button
            className="max-w-36 py-2 px-4 border-2 border-red-700 rounded-full text-lg text-red-700 font-semibold hover:bg-red-700 hover:text-quaternary transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Modal for editing user info */}
          {isModalOpen && (
            <EditUserInfoModal
              field={editField}
              userData={userData}
              onClose={closeModal}
            />
          )}
        </div>
      ) : (
        <div className="text-center text-gray-600">No user data available</div>
      )}
    </div>
  );
}
