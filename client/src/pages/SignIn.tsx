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

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: SignInValues) {
    try {
      setLoading(true);
      await signIn(values.email, values.password);
      toast({
        title: "Welcome back!",
        description: "Successfully signed in",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
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
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link href="/signup" className="text-[#4CAF50] hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}
