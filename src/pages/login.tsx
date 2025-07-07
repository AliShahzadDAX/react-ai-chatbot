import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.watch("email");
  const password = form.watch("password");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");
    if (token && expiry && Date.now() < parseInt(expiry)) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Clear messages when inputs are empty
  useEffect(() => {
    if (!email || !password) {
      setMessage(null);
      setMessageType(null);
    }
  }, [email, password]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Demo user login
      if (data.email === "demo@example.com" && data.password === "demo123") {
        const expiry = Date.now() + 30 * 60 * 1000; // 30 minutes
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("tokenExpiry", expiry.toString());

        setMessage("Login successful!");
        setMessageType("success");

        setTimeout(() => navigate("/dashboard/home", { replace: true }), 1000);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json();

      if (result.accessToken) {
        const expiry = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("tokenExpiry", expiry.toString());

        setMessage("Login successful!");
        setMessageType("success");

        setTimeout(() => navigate("/dashboard/home", { replace: true }), 1000);
      } else {
        throw new Error("Login failed");
      }
    } catch {
      setMessage("Login failed. Please check your credentials.");
      setMessageType("error");
    }
  };

  console.log("Test");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-card-back">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login Page</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {message && (
            <div
              className={`mb-4 rounded-md border p-3 text-sm w-full ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl className="bg-white">
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button variant="link" className="px-0 font-normal text-sm" type="button">
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl className="bg-white">
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6 bg-card-box">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Button variant="link" className="px-0 font-normal">
              <Link to="/register">
                Sign up
              </Link>
              
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
