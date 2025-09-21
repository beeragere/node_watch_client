import AppRouter from "./components/Router/App.router";
import { ThemeProvider } from "./components/ui/theme-provider";
import { AuthProvider } from "./context/Auth.context";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />;
      </ThemeProvider>
    </AuthProvider>
  );
}
