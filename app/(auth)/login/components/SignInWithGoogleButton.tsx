"use client";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";
import React from "react";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full font-electrolize"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      SIGN IN WITH GOOGLE
    </Button>
  );
};

export default SignInWithGoogleButton;
