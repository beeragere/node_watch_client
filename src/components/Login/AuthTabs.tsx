import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Register from "./Register";

export default function AuthTabs() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Tabs defaultValue="account">
          <TabsList className="mb-0">
            <TabsTrigger value="account">Login</TabsTrigger>
            {/* <TabsTrigger value="register">Register</TabsTrigger> */}
          </TabsList>

          <TabsContent value="account">
            <Login />
          </TabsContent>
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
