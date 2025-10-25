import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
            <Header />
            <main className="flex-1 px-6 py-8">{children}</main>
            <Footer />
        </div>
    );
}
