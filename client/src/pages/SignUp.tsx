import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../lib/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    try {
      setLoading(true);
      await signUp({
        ...values,
        age: 30, // Default values, will be updated in onboarding
        gender: "other",
        weight: 70,
        height: 170,
        activityLevel: "moderate",
        dietaryPreferences: [],
        goals: {
          type: "maintenance",
          target: 70,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to create account. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    className="h-9 px-3 py-1 text-sm transition-colors rounded-md border border-input bg-background/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    className="h-9 px-3 py-1 text-sm transition-colors rounded-md border border-input bg-background/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    {...field}
                    className="h-9 px-3 py-1 text-sm transition-colors rounded-md border border-input bg-background/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    {...field}
                    className="h-9 px-3 py-1 text-sm transition-colors rounded-md border border-input bg-background/50 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-9 px-3 py-1 text-sm font-medium transition-colors bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-md" 
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/signin" className="text-[#4CAF50] hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}
