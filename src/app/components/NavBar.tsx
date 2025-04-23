import ThemeToggle from "../theme";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 h-11 w-full">
            <div className="mx-auto flex h-full max-w-7xl justify-end items-center px-4">
                <ThemeToggle />
            </div>
        </header>
    );
}