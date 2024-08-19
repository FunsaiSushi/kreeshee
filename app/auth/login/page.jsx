"use client";

import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";

export default function page() {
  const router = useRouter();

  const handleLoginSuccess = () => {};

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
