import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route, useLocation } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./components/AuthProvider";
import { useAuth } from "./lib/auth";

import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import MealPlanner from "./pages/MealPlanner";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

function PrivateRoute({ component: Component, ...rest }: { component: React.ComponentType<any> }) {
  const { user, loading } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && location !== "/signin") {
    window.location.href = "/signin";
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/" component={() => <PrivateRoute component={Dashboard} />} />
      <Route path="/onboarding" component={() => <PrivateRoute component={Onboarding} />} />
      <Route path="/meal-planner" component={() => <PrivateRoute component={MealPlanner} />} />
      <Route path="/profile" component={() => <PrivateRoute component={Profile} />} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
