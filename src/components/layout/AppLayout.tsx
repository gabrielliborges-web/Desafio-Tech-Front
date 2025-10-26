import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>

    );
}
