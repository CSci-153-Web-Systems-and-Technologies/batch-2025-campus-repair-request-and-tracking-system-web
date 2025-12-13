"use client";
import { useRouter } from "next/navigation";

export default function SubmitRequestButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/requester/request-form")}
      className="w-full h-full"
    >
      {/* Content will be handled by parent */}
    </button>
  );
}
