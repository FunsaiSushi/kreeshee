"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { auth, updateProfile } from "@/app/lib/config/firebase";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/auth/contexts/AuthContext";

export default function ProfilePic({ userData }) {
  const router = useRouter();
  const { token, refreshToken } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(
    userData?.profilePic || "/default-user-image.svg"
  );
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleProfilePicEdit = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size and type (e.g., max 5 MB, image types)
      if (file.size > 20 * 1024 * 1024) {
        alert("File size exceeds 20 MB.");
        return;
      }

      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/tiff",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type.");
        return;
      }

      setIsUploading(true);
      setPreview(URL.createObjectURL(file)); // Show preview

      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("userId", userData._id);

      try {
        if (!token) {
          await refreshToken();
        }
        const response = await axios.post(
          `${API_URL}/user/upload-profile-pic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const updatedUser = response.data;

          // Update Firebase user profile
          if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
              photoURL: updatedUser.profilePicUrl,
            });
          }
          alert("Profile picture uploaded successfully!");
          router.refresh();
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error during profile picture upload:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="relative w-24 h-24 border-2 border-secondary rounded-full">
      <Image
        src={preview}
        alt="Profile Image"
        fill
        className="rounded-full object-cover"
      />
      <label
        className="absolute right-0 bottom-0 bg-tertiary rounded-full p-2 cursor-pointer hover:bg-quaternary transition-colors duration-300"
        aria-label="Edit Profile Picture"
      >
        <FaPen />
        <input
          type="file"
          className="hidden"
          onChange={handleProfilePicEdit}
          accept="image/*"
        />
      </label>
    </div>
  );
}
