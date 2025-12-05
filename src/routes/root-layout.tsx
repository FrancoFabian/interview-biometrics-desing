import { Outlet } from "react-router-dom";
import { MainLayout } from "../components/layout";
import { ThemeProvider } from "../components/theme-provider.tsx";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <MainLayout>
                <Outlet />
            </MainLayout>
        </ThemeProvider>
    );
}
