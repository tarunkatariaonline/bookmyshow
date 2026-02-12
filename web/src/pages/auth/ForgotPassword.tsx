import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Ticket, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Button, Input } from "@/shared/components/ui";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    // TODO: wire to auth API
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success("Reset link sent!");
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
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {isSubmitted 
              ? "Check your email for the reset link" 
              : "Enter your email to receive a reset link"}
          </p>

          {!isSubmitted ? (
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

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                loadingText="Sending..."
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="space-y-5">
               <div className="bg-primary-muted/10 border border-primary-border/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-foreground">
                    We have sent a password reset link to <br/>
                    <span className="font-semibold text-primary">{email}</span>
                  </p>
               </div>
               <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setIsSubmitted(false)}
              >
                Try different email
              </Button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
