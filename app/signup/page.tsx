"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signup } from "@/hooks/login";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const [nameError, setNameError] = useState(false);
const [passwordError, setPasswordError] = useState(false);
const [nameshake, setNameShake] = useState(false);
const [passwordShake, setPasswordShake] = useState(false);

const[emailError, setEmailError]=useState(false)

const triggerShake = (type: "name" | "password") => {
  if (type === "name") {
    setNameShake(true);
    setTimeout(() => setNameShake(false), 300);
  } else {
    setPasswordShake(true);
    setTimeout(() => setPasswordShake(false), 300);
  }
};

useEffect(() => {
  if (nameError) triggerShake("name");
}, [nameError]);

useEffect(() => {
  if (passwordError) triggerShake("password");
}, [passwordError]);

const router = useRouter()


  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(name.length<3 ||name.length> 15 ){setNameError(true)
       return}
      if(password.length<5 ||password.length> 25 ){setPasswordError(true)
       return}
   setLoading(true)

const sign = await signup({ name, email, password })
if(!sign){setEmailError(true)
  setLoading(false)
  return
}

const response = await fetch(
  `https://69fe01f98c70b15fa3ca1479.mockapi.io/api/v1/users?email=${email}`
)

const data = await response.json()

if (data.length > 0) {
  localStorage.setItem('login', JSON.stringify(data[0]))
}
setLoading(false)
router.push('/')

  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
      handleSubmit
    }
  }





  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 hilight-br">
      {/* Background ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#9333ea] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#7c3aed] opacity-[0.08] blur-[100px]" />
      </div>

      <div className="w-full max-w-sm sm:max-w-md relative mt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Create account</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign up to get started today</p>
        </div>

        {/* Glow card */}
        <div className="bg-card p-[1px] [.dark_*]:border-2 shadow-lg border-border rounded-2xl">
          <div className="bg-card rounded-[24px] p-6 sm:p-8">
            <form className="space-y-5" onKeyDown={()=>handleKeyDown}>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className={`${nameError&&"border-destructive" }shake-once w-full h-11 rounded-md bg-input border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200`}
                />
               {nameError&& <span className="text-xs text-destructive">user name should be between 3-15</span>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-11 rounded-md bg-input border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
                {emailError&& <span className="text-xs text-destructive">this email is already exist</span>}
             
              </div>
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="">
                 <div className="relative">
                   <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="***********"
                    required
                   className={`w-full h-11 rounded-md bg-input border ${passwordError ? "border-destructive" : "border-border"} px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200`}
                    />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                 </div>
                {passwordError && <span className="text-xs text-destructive">password should be between 5-15</span>
}</div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="***********"
                    required
                    className={`w-full h-11 rounded-md bg-input border px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      !passwordsMatch
                        ? "border-destructive focus:ring-destructive/40"
                        : "border-border focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                 >
                    {showConfirmPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {!passwordsMatch && (
                  <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-border accent-primary cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
                  I agree to the{" "}
                  <Link href="/" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/" className="text-primary font-medium hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="button"
                disabled={loading || !passwordsMatch}
                className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Sign in */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          By creating an account, you agree to our{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-foreground transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}