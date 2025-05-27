import React from "react";
import MainLayout from "@/components/MainLayout";
import LoginForm from "@/components/Forms/LoginForm";

export default function LoginPage() {
  return (
    <MainLayout name="Login">
      {/* This div keeps the padding so the form doesn't go under the fixed header */}
      <div className="pt-14">
        <LoginForm />
      </div>
    </MainLayout>
  );
}
