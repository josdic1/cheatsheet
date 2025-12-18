import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

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
        <div>
            {cheats.map(cheat => <div key={cheat.id}>{cheat.title}</div>)}
        </div>
    );
}