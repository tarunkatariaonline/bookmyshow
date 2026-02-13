import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Ticket, User } from "lucide-react";
import toast from "react-hot-toast";
import { Button, Input } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import googleIcon from "@/assets/google.svg";
import { useRegisterMutation } from "@/features/auth/hooks/useAuthMutations";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const { mutate: register, isPending: isLoading } = useRegisterMutation();

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    // TODO: wire to Google OAuth
    await new Promise((r) => setTimeout(r, 600));
    setIsGoogleLoading(false);
    toast.success("Google sign up coming soon!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    register({ name, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-sans text-foreground py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--color-primary-glow),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/40" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-[420px] px-6">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-muted text-primary border border-primary-border">
            <Ticket className="w-7 h-7" strokeWidth={2} />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            BookMyShow
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-muted shadow-2xl shadow-black/40 backdrop-blur-xl p-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Enter your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="name"
              type="text"
              label="Full name"
              placeholder="John Doe"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User />}
            />

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail />}
            />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock />}
              rightSlot={
                <Button
                  type="button"
                  variant="custom"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "p-1.5 rounded-lg text-muted-foreground hover:text-muted-foreground-subtle hover:bg-muted transition-colors",
                  )}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              }
            />

            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock />}
              rightSlot={
                <Button
                  type="button"
                  variant="custom"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={cn(
                    "p-1.5 rounded-lg text-muted-foreground hover:text-muted-foreground-subtle hover:bg-muted transition-colors",
                  )}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              }
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Sign up
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-transparent px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              isLoading={isGoogleLoading}
              leftIcon={
                !isGoogleLoading ? (
                  <img
                    src={googleIcon}
                    alt="Google"
                    className="w-5 h-5"
                    loading="lazy"
                    />
                ) : undefined
              }
              onClick={handleGoogleSignUp}
              className="gap-3"
            >
              Sign up with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary/90 hover:text-primary transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Signup;
