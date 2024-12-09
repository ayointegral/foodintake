import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Utensils, Activity, Brain, Heart } from "lucide-react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Landing() {
  const [activeDialog, setActiveDialog] = useState<"signin" | "signup" | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background backdrop-blur-[2px]" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Your Personal Health & Nutrition Journey Starts Here
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Get personalized meal plans, track your nutrition, and achieve your health goals with our comprehensive health planner.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button size="lg" className="gap-2" onClick={() => setActiveDialog("signup")}>
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => setActiveDialog("signin")}>
                Sign In
              </Button>

              <Dialog open={activeDialog === "signup"} onOpenChange={(open) => setActiveDialog(open ? "signup" : null)}>
                <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border border-border/30 shadow-lg">
                  <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-2xl font-bold">
                      Create an Account
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Start your health journey today
                    </DialogDescription>
                  </DialogHeader>
                  <div className="px-6 pb-6 pt-2">
                    <SignUp />
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={activeDialog === "signin"} onOpenChange={(open) => setActiveDialog(open ? "signin" : null)}>
                <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border border-border/30 shadow-lg">
                  <DialogHeader className="px-6 pt-6">
                    <DialogTitle className="text-2xl font-bold">
                      Welcome Back
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Sign in to your account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="px-6 pb-6 pt-2">
                    <SignIn />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need for a Healthier Lifestyle
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Utensils className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Smart Meal Planning</CardTitle>
              <CardDescription>
                Get personalized meal plans based on your dietary preferences and goals
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your nutrition intake and track your fitness progress
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Educational Content</CardTitle>
              <CardDescription>
                Learn about nutrition and develop healthy eating habits
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Health Analytics</CardTitle>
              <CardDescription>
                Get insights into your health metrics and lifestyle patterns
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already started their journey to a healthier lifestyle with our comprehensive health planner.
          </p>
          <Button size="lg" className="gap-2" onClick={() => setActiveDialog("signup")}>
            Start Your Journey <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
