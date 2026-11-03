import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    authPromptMessage,
    closeAuthModal,
    setAuthModalMode,
    login,
    signup,
  } = useAuth();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const isLogin = authModalMode === "login";

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSwitchMode = (mode) => {
    resetForm();
    setAuthModalMode(mode);
  };

  const handleFillDemo = () => {
    setEmail("aarav@ecowatch.org");
    setPassword("password123");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login({ email, password });
        resetForm();
      } else {
        await signup({ fullName, phone, email, password });
        resetForm();
      }
    } catch (err) {
      setErrorMessage(err.message || "An authentication error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#182230]/50 backdrop-blur-sm animate-fadeIn"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#ffffff] border border-[#e4dfd7] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#182230] animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#f8f3ee] hover:bg-[#ded9d4] text-[#4a5568] hover:text-[#182230] flex items-center justify-center transition-colors border border-[#e4dfd7] cursor-pointer"
          title="Close dialog"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header Badge & Title */}
        <div className="flex flex-col items-start gap-1.5 mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eaf3f3] border border-[#a5ced0] text-[#1f6e72] text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">
              {isLogin ? "lock" : "person_add"}
            </span>
            <span>
              {isLogin ? "Citizen Authentication" : "Citizen Registration"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#182230]">
            {isLogin ? "Sign In to Eco-Watch" : "Create Citizen Profile"}
          </h2>
          <p className="text-xs text-[#4a5568]">
            {isLogin
              ? "Access verified incident submissions and expedited status dispatch."
              : "Register your contact details to submit and track environmental incidents."}
          </p>
        </div>

        {/* Intercept Guard Prompt Banner (if triggered by incident form or route guard) */}
        {authPromptMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-[#eaf3f3] border border-[#a5ced0] text-[#155255] flex items-start gap-2.5 text-xs leading-relaxed animate-fadeIn">
            <span className="material-symbols-outlined text-[#1f6e72] text-[18px] shrink-0 mt-0.5">
              shield_with_heart
            </span>
            <div>
              <span className="font-bold text-[#182230] block mb-0.5">
                Authentication Required
              </span>
              <span>{authPromptMessage}</span>
            </div>
          </div>
        )}

        {/* Error Feedback State */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[#fbeae8] border border-[#e5c8bf] text-[#8c3322] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b85042] text-[18px] shrink-0">
              error
            </span>
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Success Feedback State */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[#e0f2f1] border border-[#a5ced0] text-[#155255] text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1f6e72] text-[18px] shrink-0">
              check_circle
            </span>
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 mb-5 bg-[#f8f3ee] rounded-xl border border-[#e4dfd7]">
          <button
            type="button"
            onClick={() => handleSwitchMode("login")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              isLogin
                ? "bg-[#ffffff] text-[#182230] shadow-xs"
                : "text-[#4a5568] hover:text-[#182230]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode("signup")}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              !isLogin
                ? "bg-[#ffffff] text-[#182230] shadow-xs"
                : "text-[#4a5568] hover:text-[#182230]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Signup only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label
                className="text-[11px] font-bold uppercase tracking-wider text-[#182230] flex items-center justify-between"
                htmlFor="authFullName"
              >
                <span>Full Name</span>
                <span className="text-[#1f6e72] text-[10px] lowercase font-semibold">required</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
                  badge
                </span>
                <input
                  id="authFullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-3.5 py-2.5 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Phone Number (Signup only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label
                className="text-[11px] font-bold uppercase tracking-wider text-[#182230] flex items-center justify-between"
                htmlFor="authPhone"
              >
                <span>Phone Number</span>
                <span className="text-[#1f6e72] text-[10px] lowercase font-semibold">required</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
                  call
                </span>
                <input
                  id="authPhone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98100 45678"
                  className="w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-3.5 py-2.5 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Address (Both) */}
          <div className="space-y-1.5">
            <label
              className="text-[11px] font-bold uppercase tracking-wider text-[#182230] flex items-center justify-between"
              htmlFor="authEmail"
            >
              <span>Email Address</span>
              <span className="text-[#1f6e72] text-[10px] lowercase font-semibold">required</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
                mail
              </span>
              <input
                id="authEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@ecowatch.org"
                className="w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-3.5 py-2.5 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all"
              />
            </div>
          </div>

          {/* Password (Both) */}
          <div className="space-y-1.5">
            <label
              className="text-[11px] font-bold uppercase tracking-wider text-[#182230] flex items-center justify-between"
              htmlFor="authPassword"
            >
              <span>Password</span>
              <span className="text-[#4a5568] text-[10px]">
                {isLogin ? "" : "min 6 characters"}
              </span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
                key
              </span>
              <input
                id="authPassword"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-10 py-2.5 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#182230] transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Quick-Fill Demo Account Helper (for rapid testing) */}
          {isLogin && (
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs">
              <span className="text-[#4a5568]">Instant Testing Account:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#1f6e72] hover:text-[#155255] font-bold underline cursor-pointer"
              >
                Auto-fill Demo Citizen
              </button>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#1f6e72] hover:bg-[#155255] text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    {isLogin ? "login" : "how_to_reg"}
                  </span>
                  <span>
                    {isLogin ? "Sign In to Account" : "Complete Registration"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Switcher */}
        <div className="mt-5 pt-4 border-t border-[#e4dfd7] text-center text-xs text-[#4a5568] flex items-center justify-center gap-1.5">
          <span>
            {isLogin ? "Don't have an account yet?" : "Already registered?"}
          </span>
          <button
            type="button"
            onClick={() => handleSwitchMode(isLogin ? "signup" : "login")}
            className="text-[#1f6e72] hover:underline font-bold transition-colors cursor-pointer"
          >
            {isLogin ? "Sign up now" : "Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
}
