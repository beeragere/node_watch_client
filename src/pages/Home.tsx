import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/Auth.context";

export default function Home() {
  const { logout } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center p-6">
      <Header />

      <main className="w-full max-w-4xl grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back 👋</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a dummy home page. You can start adding your app’s real
              content here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>View Profile</Button>
            <Button variant="secondary">Settings</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
