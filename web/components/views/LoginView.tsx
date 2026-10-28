"use client";

import React, { useState, useCallback, useId } from "react";

/**
 * ============================================================================
 * MediOS — AI-Powered Medical Assistance & Healthcare Support System
 * Component: LoginView
 * 
 * Final-Year B.Tech CSE Team Project
 * Modern, accessible, high-trust healthcare authentication interface.
 * ============================================================================
 */

export interface LoginViewProps {
  /** Optional callback triggered when frontend validation passes */
  onLoginAttempt?: (email: string) => void;
  /** Optional callback to navigate to sign up view */
  onNavigateSignUp?: () => void;
  /** Optional callback to navigate to forgot password view */
  onNavigateForgotPassword?: () => void;
}

// ============================================================================
// Inline Accessible SVG Icons (No external icon dependency required)
// ============================================================================

function MediOSLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="medos-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#medos-logo-grad)" />
      <path
        d="M16 6.5C13.2 6.5 11 8.7 11 11.5C11 13.3 12 14.8 13.4 15.7C10.7 16.9 8.5 19.6 8.5 23C8.5 23.6 8.9 24 9.5 24H22.5C23.1 24 23.5 23.6 23.5 23C23.5 19.6 21.3 16.9 18.6 15.7C20 14.8 21 13.3 21 11.5C21 8.7 18.8 6.5 16 6.5Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Subtle Medical Cross Accent */}
      <path
        d="M16 10V13M14.5 11.5H17.5"
        stroke="#2563EB"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StethoscopeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
      <path d="M6 3h3" />
      <path d="M15 3h3" />
      <path d="M9 12.5a4.5 4.5 0 0 0 9 0" />
      <path d="M18 12.5V17a3 3 0 0 1-3 3h-1" />
      <circle cx="14" cy="20" r="2" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function HeartPulseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h6.28" />
    </svg>
  );
}

function SparklesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function AlertCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function InfoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SpinnerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function CloseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ============================================================================
// Main LoginView Component
// ============================================================================

export default function LoginView({
  onLoginAttempt,
  onNavigateSignUp,
  onNavigateForgotPassword,
}: LoginViewProps) {
  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation & interaction states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status feedback state (No fake auth — communicates backend disconnection honestly)
  const [statusNotice, setStatusNotice] = useState<{
    type: "info" | "warning" | "success";
    title: string;
    message: string;
    timestamp: string;
  } | null>(null);

  // Dialog / Modal states for placeholder flows
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    actionText: string;
    badge?: string;
  } | null>(null);

  // Accessibility unique IDs
  const emailInputId = useId();
  const passwordInputId = useId();
  const rememberCheckboxId = useId();
  const emailErrorId = useId();
  const passwordErrorId = useId();
  const statusNoticeId = useId();

  // Email format validation (standard RFC-compliant check)
  const validateEmailFormat = (val: string): string | undefined => {
    if (!val.trim()) {
      return "Email address is required.";
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(val.trim())) {
      return "Please enter a valid email address (e.g. doctor@hospital.org).";
    }
    return undefined;
  };

  // Password validation
  const validatePassword = (val: string): string | undefined => {
    if (!val) {
      return "Password is required.";
    }
    if (val.length < 6) {
      return "Password must be at least 6 characters in length.";
    }
    return undefined;
  };

  // Handle live blur validation
  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      const err = validateEmailFormat(email);
      setErrors((prev) => ({ ...prev, email: err }));
    } else {
      const err = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: err }));
    }
  };

  // Handle live change validation if already touched
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmailFormat(val) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  // Form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      setTouched({ email: true, password: true });

      const emailErr = validateEmailFormat(email);
      const passwordErr = validatePassword(password);

      setErrors({
        email: emailErr,
        password: passwordErr,
      });

      if (emailErr || passwordErr) {
        // Focus first invalid field for keyboard & screen reader accessibility
        if (emailErr) {
          const el = document.getElementById(emailInputId);
          el?.focus();
        } else if (passwordErr) {
          const el = document.getElementById(passwordInputId);
          el?.focus();
        }
        return;
      }

      // Start submission feedback
      setIsSubmitting(true);
      setStatusNotice(null);

      // Notify parent callback if provided
      if (onLoginAttempt) {
        onLoginAttempt(email.trim());
      }

      // Simulate a brief, realistic network roundtrip
      // IMPORTANT: In accordance with project requirements, we do NOT fake successful login
      // or store plaintext/hashed passwords on client. Instead, we explain that client
      // validation succeeded, but the authentication backend API is not yet connected.
      setTimeout(() => {
        setIsSubmitting(false);
        setStatusNotice({
          type: "info",
          title: "Frontend Validation Passed • Auth Backend Not Connected",
          message: `Form credentials for "${email.trim()}" passed all client-side validation rules. MediOS backend authentication service (/api/proxy/auth/login) is currently offline or awaiting deployment in this environment. Passwords are never saved in local storage.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        });
      }, 750);
    },
    [email, password, emailInputId, passwordInputId, onLoginAttempt]
  );

  // Google OAuth placeholder handler
  const handleGoogleClick = () => {
    setModalContent({
      title: "Google Authentication (UI Placeholder)",
      badge: "Demonstration Component",
      description:
        "Google Sign-In is presented as an interface design placeholder for this capstone demonstration. OAuth 2.0 client credentials and backend verification endpoints are not configured in this development environment.",
      actionText: "Understood",
    });
  };

  // Forgot password placeholder handler
  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateForgotPassword) {
      onNavigateForgotPassword();
      return;
    }
    setModalContent({
      title: "Password Recovery Service",
      badge: "Self-Service Recovery",
      description:
        "In the production MediOS environment, a secure time-sensitive reset link with SHA-256 verification token will be dispatched to your registered medical institute or personal email. Backend email dispatch is currently waiting for SMTP/SendGrid configuration.",
      actionText: "Close",
    });
  };

  // Sign up placeholder handler
  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateSignUp) {
      onNavigateSignUp();
      return;
    }
    setModalContent({
      title: "New Patient & Clinician Registration",
      badge: "Registration Portal",
      description:
        "The MediOS registration module is assigned to another team member and will allow patients and healthcare providers to create encrypted profiles with HIPAA consent workflows.",
      actionText: "Got it",
    });
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-800 dark:bg-[#0B1220] dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-12 transition-colors">
      {/* Background Ambient Accents */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl dark:bg-blue-600/10" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl dark:bg-teal-500/10" />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================================================================== */}
        {/* LEFT COLUMN: MediOS Healthcare Identity & Product Narrative        */}
        {/* ================================================================== */}
        <section
          aria-labelledby="branding-heading"
          className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-6"
        >
          {/* Top Brand Tag & Logo */}
          <div className="flex items-center space-x-3.5">
            <MediOSLogo className="w-12 h-12 shadow-sm rounded-xl" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                  MediOS
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  v2.0 AI System
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Final Year B.Tech CSE Project • Healthcare Technology
              </p>
            </div>
          </div>

          {/* Primary Headlines */}
          <div className="space-y-3">
            <h1
              id="branding-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
            >
              Healthcare,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Made Smarter.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Your intelligent companion for medical guidance, prescription tracking,
              and continuous healthcare support — designed for reliability and privacy.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {/* Feature 1 */}
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/80 dark:bg-[#121B2D]/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Clinical AI Assistant
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Multilingual symptom guidance aligned with clinical literature.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/80 dark:bg-[#121B2D]/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 shrink-0">
                <HeartPulseIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Vitals & Medications
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  AI pill scanning, dosage alerts, and personalized reminders.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/80 dark:bg-[#121B2D]/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 shrink-0">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Privacy-First Design
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Client-side data sandboxing with zero unauthorized disclosures.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/80 dark:bg-[#121B2D]/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 shrink-0">
                <StethoscopeIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Doctor & Clinic Sync
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Structured clinical summaries ready for medical consultation.
                </p>
              </div>
            </div>
          </div>

          {/* Academic & Compliance Badge */}
          <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Demonstration Environment • College CSE Capstone Project</span>
          </div>
        </section>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: The Polished Healthcare Login Card                   */}
        {/* ================================================================== */}
        <section
          aria-labelledby="login-card-title"
          className="lg:col-span-6 w-full max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-[#121B2D] rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-200/60 dark:shadow-none transition-all">
            
            {/* Card Header */}
            <div className="mb-6 text-center sm:text-left">
              <h2
                id="login-card-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Welcome Back
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Sign in to continue to your MediOS health portal.
              </p>
            </div>

            {/* Informational Notification / Status Banner */}
            {statusNotice && (
              <div
                id={statusNoticeId}
                role="alert"
                aria-live="polite"
                className={`mb-5 p-4 rounded-xl border text-xs sm:text-sm transition-all ${
                  statusNotice.type === "info"
                    ? "bg-blue-50/80 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900/60 dark:text-blue-200"
                    : "bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200"
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <InfoIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{statusNotice.title}</p>
                      <span className="text-[10px] opacity-75 font-mono">
                        {statusNotice.timestamp}
                      </span>
                    </div>
                    <p className="leading-relaxed opacity-90">
                      {statusNotice.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Field 1: Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor={emailInputId}
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  Email Address <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  >
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? emailErrorId : undefined}
                    placeholder="name@example.com"
                    className={`block w-full pl-11 pr-4 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#0B1220] border transition-colors focus:bg-white dark:focus:bg-[#0E1627] focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 dark:border-red-600 text-red-900 dark:text-red-200 focus:ring-red-400/30 focus:border-red-500"
                        : "border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-blue-500/20 focus:border-blue-600"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p
                    id={emailErrorId}
                    role="alert"
                    className="flex items-center space-x-1.5 text-xs text-red-600 dark:text-red-400 pt-0.5"
                  >
                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={passwordInputId}
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Password <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  >
                    <LockIcon className="w-5 h-5" />
                  </div>
                  <input
                    id={passwordInputId}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? passwordErrorId : undefined}
                    placeholder="••••••••"
                    className={`block w-full pl-11 pr-11 py-2.5 sm:py-3 text-sm rounded-xl bg-slate-50 dark:bg-[#0B1220] border transition-colors focus:bg-white dark:focus:bg-[#0E1627] focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-400 dark:border-red-600 text-red-900 dark:text-red-200 focus:ring-red-400/30 focus:border-red-500"
                        : "border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-blue-500/20 focus:border-blue-600"
                    }`}
                  />
                  {/* Password Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none focus:text-blue-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id={passwordErrorId}
                    role="alert"
                    className="flex items-center space-x-1.5 text-xs text-red-600 dark:text-red-400 pt-0.5"
                  >
                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor={rememberCheckboxId}
                  className="flex items-center space-x-2.5 cursor-pointer select-none"
                >
                  <input
                    id={rememberCheckboxId}
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 border-slate-300 dark:border-slate-700 dark:bg-[#0B1220]"
                  />
                  <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Remember me for 30 days
                  </span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900/50"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon className="w-4 h-4 text-white" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#121B2D] px-2.5 text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
                    Or
                  </span>
                </div>
              </div>

              {/* Google Sign In Placeholder Button */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0E1627] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700"
                >
                  <div className="flex items-center space-x-2.5">
                    <GoogleIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>Continue with Google</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    UI Placeholder
                  </span>
                </button>
                <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
                  Third-party OAuth is not active in this development build.
                </p>
              </div>

              {/* Sign Up Navigation Prompt */}
              <div className="pt-3 text-center">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSignUpClick}
                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none focus:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>

            </form>

            {/* Security Notice & Medical Disclaimer Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center space-x-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500 inline shrink-0" />
                <span>
                  Protected by client isolation. Passwords are never stored on device.
                </span>
              </p>
            </div>

          </div>
        </section>

      </div>

      {/* ================================================================== */}
      {/* Modal Dialog for Informational Placeholders (Google, Sign Up, etc)  */}
      {/* ================================================================== */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-white dark:bg-[#121B2D] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <InfoIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="modal-title"
                    className="text-base font-bold text-slate-900 dark:text-white"
                  >
                    {modalContent.title}
                  </h3>
                  {modalContent.badge && (
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                      {modalContent.badge}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                aria-label="Close dialog"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {modalContent.description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {modalContent.actionText}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export { LoginView };
