import React from "react";
import { SignUpForm } from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div>

    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img
          src="/images/cover.png"
          alt="Background"
          className="h-1/2 w-auto object-contain opacity-100"
        />
      </div>

      <div className="relative z-10">
        <SignUpForm/>
      </div>
    </div>
    </div>
  )
}

export default SignUpPage;
