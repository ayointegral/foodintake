import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import ProgressChart from "../components/ProgressChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserProfile, NutritionData } from "../types";

export default function Profile() {
  const { data: profile } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/users/1"); // TODO: Get from auth
      return response.json();
    },
  });

  const { data: nutritionHistory } = useQuery<NutritionData[]>({
    queryKey: ["nutritionHistory"],
    queryFn: async () => {
      const response = await fetch("/api/nutrition");
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://i.pravatar.cc/96" />
                <AvatarFallback>
                  {profile?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="mt-4 text-center md:text-left md:mt-0">
                <h1 className="text-2xl font-bold">{profile?.name}</h1>
                <p className="text-muted-foreground">{profile?.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile?.dietaryPreferences?.map((pref) => (
                    <span
                      key={pref}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button>Edit Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Age</dt>
                      <dd className="text-lg">{profile?.age} years</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                      <dd className="text-lg capitalize">{profile?.gender}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Weight</dt>
                      <dd className="text-lg">{profile?.weight} kg</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Height</dt>
                      <dd className="text-lg">{profile?.height} cm</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fitness Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1487956382158-bb926046304a"
                      alt="Fitness"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="mt-4">
                      <p className="text-lg font-medium capitalize">
                        {profile?.goals.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Target: {profile?.goals.target} kg
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {nutritionHistory && (
                    <ProgressChart
                      data={nutritionHistory}
                      metric="weight"
                      title="Weight Trend"
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>Your recent workouts and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="https://images.unsplash.com/photo-1486218119243-13883505764c"
                    alt="Activity tracking"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how you want to receive notifications
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your privacy settings
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
