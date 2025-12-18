

function HomePage() {
    const { } = useAuth();

    
    // Wait for auth to load
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Now safe to fetch data
    useEffect(() => {
        if (loggedIn) {
            fetch('/api/cheats')
                .then(r => r.json())
                .then(setCheats);
        }
    }, [loggedIn]);
    
    return (
        <div>
            {cheats.map(cheat => <div key={cheat.id}>{cheat.title}</div>)}
        </div>
    );
}