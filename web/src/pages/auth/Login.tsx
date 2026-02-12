import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Ticket } from "lucide-react";
import toast from "react-hot-toast";
import { Button, Input } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import googleIcon from "@/assets/google.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    // TODO: wire to Google Auth
    await new Promise((r) => setTimeout(r, 800));
    setIsGoogleLoading(false);
    toast.success("Google Sign In not implemented yet");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    setIsLoading(true);
    // TODO: wire to auth API
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    toast.success("Welcome back!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background font-sans text-foreground">
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
        <div className="flex items-center justify-center gap-2 mb-10">
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
            Sign in
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Enter your details to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="current-password"
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-end ">
              <Link
                to="/forgot-password"
                className="text-sm text-primary/90 hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign in
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
              onClick={handleGoogleSignIn}
              className="gap-3"
            >
              Sign in with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary/90 hover:text-primary transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/80">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
