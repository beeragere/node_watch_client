import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./components/Router/App.router";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthProvider } from "./context/Auth.context";
import { ToastProvider } from "./components/ui/ToastProvider";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastProvider>
            <AppRouter />;
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
