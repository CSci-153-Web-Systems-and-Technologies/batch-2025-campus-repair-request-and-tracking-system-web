import React from "react";
import { SignUpForm } from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <img
          src="/images/cover.png"
          alt="Background"
          className="h-140 w-auto object-contain opacity-100"
        />
      </div>

    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg">
              <img
                src="/images/helmet.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="align-column">
            <h1 className="text-lime-950 text-sm lg:text-xl font-electrolize hidden sm:block">
            Campus Repair Portal
            </h1>
            <p className="text-lime-950 text-xs font-montserrat">Submit, Track, and Manage Repair Requests Online</p>
            </div>
        </div>

      <div className="relative z-10">
        <SignUpForm/>
      </div>
    </div>
  )
}

export default SignUpPage;
