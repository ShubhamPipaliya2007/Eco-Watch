import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FlipCard from "./FlipCard";

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

  // ---- Flip state ----
  const [isFlipped, setIsFlipped] = useState(false);

  // ---- Login form state ----
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // ---- Signup form state ----
  const [signupFullName, setSignupFullName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSubmitting, setSignupSubmitting] = useState(false);

  // Sync the flip state with authModalMode when the modal opens
  React.useEffect(() => {
    if (isAuthModalOpen) {
      setIsFlipped(authModalMode === "signup");
    }
  }, [isAuthModalOpen, authModalMode]);

  if (!isAuthModalOpen) return null;

  // ---- Reset helpers ----
  const resetLoginForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginShowPassword(false);
    setLoginError("");
  };

  const resetSignupForm = () => {
    setSignupFullName("");
    setSignupPhone("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupShowPassword(false);
    setSignupError("");
  };

  const handleClose = () => {
    resetLoginForm();
    resetSignupForm();
    setIsFlipped(false);
    closeAuthModal();
  };

  // ---- Flip to Sign Up ----
  const flipToSignup = () => {
    resetLoginForm();
    setIsFlipped(true);
    setAuthModalMode("signup");
  };

  // ---- Flip to Sign In ----
  const flipToLogin = () => {
    resetSignupForm();
    setIsFlipped(false);
    setAuthModalMode("login");
  };

  // ---- Demo auto-fill ----
  const handleFillDemo = () => {
    setLoginEmail("aarav@ecowatch.org");
    setLoginPassword("password123");
    setLoginError("");
  };

  // ---- Login submit ----
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      resetLoginForm();
      resetSignupForm();
      setIsFlipped(false);
    } catch (err) {
      setLoginError(err.message || "An authentication error occurred.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  // ---- Signup submit ----
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupSubmitting(true);
    try {
      await signup({
        fullName: signupFullName,
        phone: signupPhone,
        email: signupEmail,
        password: signupPassword,
      });
      resetLoginForm();
      resetSignupForm();
      setIsFlipped(false);
    } catch (err) {
      setSignupError(err.message || "An authentication error occurred.");
    } finally {
      setSignupSubmitting(false);
    }
  };

  /* ===========================================================
   * SHARED UI PIECES
   * =========================================================== */
  const inputClass =
    "w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-3.5 py-2 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all";
  const inputPasswordClass =
    "w-full bg-[#f8f3ee] text-[#182230] placeholder:text-[#4a5568]/60 pl-10 pr-10 py-2 rounded-lg text-sm border border-[#e4dfd7] focus:border-[#1f6e72] focus:bg-[#ffffff] outline-none transition-all";
  const labelClass =
    "text-[11px] font-bold uppercase tracking-wider text-[#182230] flex items-center justify-between";

  /* ===========================================================
   * FRONT FACE — Sign In
   * =========================================================== */
  const signInFace = (
    <div className="bg-[#fffbf7] border border-[#e4dfd7] rounded-2xl p-6 sm:p-7 shadow-2xl text-[#182230]">
      {/* Close Button */}
      <button
        onClick={handleClose}
        type="button"
        className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#f8f3ee] hover:bg-[#ded9d4] text-[#4a5568] hover:text-[#182230] flex items-center justify-center transition-colors border border-[#e4dfd7] cursor-pointer z-10"
        title="Close dialog"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>

      {/* Header Badge & Title */}
      <div className="flex flex-col items-start gap-1 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaf3f3] border border-[#a5ced0] text-[#115e59] text-[11px] font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>Citizen Authentication</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#182230]">
          Sign In to Eco-Watch
        </h2>
        <p className="text-xs text-[#4a5568]">
          Access verified incident submissions and expedited status dispatch.
        </p>
      </div>

      {/* Auth prompt banner */}
      {authPromptMessage && (
        <div className="mb-3.5 p-3 rounded-xl bg-[#eaf3f3] border border-[#a5ced0] text-[#155255] flex items-start gap-2.5 text-xs leading-relaxed">
          <span className="material-symbols-outlined text-[#115e59] text-[18px] shrink-0 mt-0.5">
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

      {/* Error */}
      {loginError && (
        <div className="mb-3.5 p-2.5 rounded-lg bg-[#fbeae8] border border-[#e5c8bf] text-[#8c3322] text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[#b85042] text-[18px] shrink-0">
            error
          </span>
          <span className="font-medium">{loginError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-3.5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="loginEmail">
            <span>Email Address</span>
            <span className="text-[#115e59] text-[10px] lowercase font-semibold">
              required
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              mail
            </span>
            <input
              id="loginEmail"
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="citizen@ecowatch.org"
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="loginPassword">
            <span>Password</span>
            <span className="text-[#4a5568] text-[10px]" />
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              key
            </span>
            <input
              id="loginPassword"
              type={loginShowPassword ? "text" : "password"}
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className={inputPasswordClass}
            />
            <button
              type="button"
              onClick={() => setLoginShowPassword(!loginShowPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#182230] transition-colors"
              title={loginShowPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined text-[18px]">
                {loginShowPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Demo auto-fill */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f8f3ee] border border-[#e4dfd7] text-xs">
          <span className="text-[#4a5568]">Instant Testing Account:</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[#115e59] hover:text-[#155255] font-bold underline cursor-pointer"
          >
            Auto-fill Demo Citizen
          </button>
        </div>

        {/* Submit */}
        <div className="pt-1.5">
          <button
            type="submit"
            disabled={loginSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-[#115e59] hover:bg-[#155255] text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loginSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  login
                </span>
                <span>Sign In to Account</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer — switch to Sign Up */}
      <div className="mt-4 pt-3.5 border-t border-[#e4dfd7] text-center text-xs text-[#4a5568] flex items-center justify-center gap-1.5">
        <span>Don&apos;t have an account yet?</span>
        <button
          type="button"
          onClick={flipToSignup}
          className="text-[#115e59] hover:underline font-bold transition-colors cursor-pointer"
        >
          Sign up now
        </button>
      </div>
    </div>
  );

  /* ===========================================================
   * BACK FACE — Create Account / Sign Up
   * =========================================================== */
  const signUpFace = (
    <div className="bg-[#fffbf7] border border-[#e4dfd7] rounded-2xl p-6 sm:p-7 shadow-2xl text-[#182230]">
      {/* Close Button */}
      <button
        onClick={handleClose}
        type="button"
        className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#f8f3ee] hover:bg-[#ded9d4] text-[#4a5568] hover:text-[#182230] flex items-center justify-center transition-colors border border-[#e4dfd7] cursor-pointer z-10"
        title="Close dialog"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>

      {/* Header Badge & Title */}
      <div className="flex flex-col items-start gap-1 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaf3f3] border border-[#a5ced0] text-[#115e59] text-[11px] font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[14px]">
            person_add
          </span>
          <span>Citizen Registration</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#182230]">
          Create Citizen Profile
        </h2>
        <p className="text-xs text-[#4a5568]">
          Register your contact details to submit and track environmental
          incidents.
        </p>
      </div>

      {/* Error */}
      {signupError && (
        <div className="mb-3 p-2.5 rounded-lg bg-[#fbeae8] border border-[#e5c8bf] text-[#8c3322] text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[#b85042] text-[18px] shrink-0">
            error
          </span>
          <span className="font-medium">{signupError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSignupSubmit} className="space-y-3">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="signupFullName">
            <span>Full Name</span>
            <span className="text-[#115e59] text-[10px] lowercase font-semibold">
              required
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              badge
            </span>
            <input
              id="signupFullName"
              type="text"
              required
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="signupPhone">
            <span>Phone Number</span>
            <span className="text-[#115e59] text-[10px] lowercase font-semibold">
              required
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              call
            </span>
            <input
              id="signupPhone"
              type="tel"
              required
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              placeholder="e.g. +91 98100 45678"
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="signupEmail">
            <span>Email Address</span>
            <span className="text-[#115e59] text-[10px] lowercase font-semibold">
              required
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              mail
            </span>
            <input
              id="signupEmail"
              type="email"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="citizen@ecowatch.org"
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="signupPassword">
            <span>Password</span>
            <span className="text-[#4a5568] text-[10px]">
              min 6 characters
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568] text-[18px]">
              key
            </span>
            <input
              id="signupPassword"
              type={signupShowPassword ? "text" : "password"}
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="••••••••"
              className={inputPasswordClass}
            />
            <button
              type="button"
              onClick={() => setSignupShowPassword(!signupShowPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#182230] transition-colors"
              title={signupShowPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined text-[18px]">
                {signupShowPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-1.5">
          <button
            type="submit"
            disabled={signupSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-[#115e59] hover:bg-[#155255] text-white text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {signupSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  how_to_reg
                </span>
                <span>Complete Registration</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Footer — switch to Sign In */}
      <div className="mt-4 pt-3.5 border-t border-[#e4dfd7] text-center text-xs text-[#4a5568] flex items-center justify-center gap-1.5">
        <span>Already registered?</span>
        <button
          type="button"
          onClick={flipToLogin}
          className="text-[#115e59] hover:underline font-bold transition-colors cursor-pointer"
        >
          Log in here
        </button>
      </div>
    </div>
  );

  /* ===========================================================
   * RENDER — Modal overlay wrapping the FlipCard
   * =========================================================== */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#182230]/50 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <FlipCard
          flipped={isFlipped}
          axis="y"
          flipOnClick={false}
          front={signInFace}
          back={signUpFace}
          duration={0.6}
        />
      </div>
    </div>
  );
}
