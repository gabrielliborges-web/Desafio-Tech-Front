export default function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-neutral-900 border-b border-neutral-800">
            <div className="text-xl font-bold text-white tracking-wide">
                <span className="text-purple-400">CUBOS</span> Movies
            </div>

            <div className="flex items-center gap-4">

                <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded text-white">
                    Logout
                </button>
            </div>
        </header>
    );
}
