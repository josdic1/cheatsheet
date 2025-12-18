import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { CheatList } from "../components/CheatList";

export function HomePage() {
    const { loading, loggedIn } = useAuth();
    const [cheats, setCheats] = useState([]);

    useEffect(() => {
        if (loggedIn) {
            fetch('/api/cheats', { credentials: 'include' })
                .then(r => r.json())
                .then(setCheats);
        }
    }, [loggedIn]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <header className="app-header">
      <img src="/vite.svg" alt="App logo" className="app-logo" />
    </header>
        <main>
            <CheatList cheats={cheats}/>
        </main>
        </>
    );
}