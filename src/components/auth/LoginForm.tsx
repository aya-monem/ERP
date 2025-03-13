import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, hardcoded credentials
      if (email === "admin@example.com" && password === "password") {
        // Store auth state in localStorage or context
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "John Doe",
            email: "admin@example.com",
            role: "Administrator",
          }),
        );
        // Explicitly navigate to dashboard
        navigate("/");
        console.log("Login successful, redirecting to dashboard");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#1976d2]">
            FacilityHub
          </CardTitle>
          <CardDescription className="text-[#757575]">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-[#ffebee] text-[#f44336] p-3 rounded-md mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#424242]">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#9e9e9e]" />
                  <Input
                    id="email"
                    placeholder="admin@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#424242]">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-[#1976d2] hover:text-[#1565c0] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-[#9e9e9e]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-[#e0e0e0] focus-visible:ring-[#1976d2]"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="border-[#e0e0e0] data-[state=checked]:bg-[#1976d2] data-[state=checked]:border-[#1976d2]"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-[#616161] cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#1976d2] hover:bg-[#1565c0]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-[#757575]">
            <span>Demo credentials: </span>
            <span className="font-medium text-[#424242]">
              admin@example.com / password
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
