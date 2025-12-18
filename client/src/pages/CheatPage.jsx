import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { DateTimeInline } from "../components/DateTimeInline";

export function CheatPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // 1. GET DATA FROM STORE (Already paid for)
  const { loading, cheats } = useAuth(); 

  // 2. INITIALIZE LOCAL STATE
  // Try to grab it from the "backpack"/location/{state} (router state) for instant access.
  const [cheat, setCheat] = useState(state?.cheat || null);

  useEffect(() => {
    // If we already have the cheat (from backpack), stop. Cost: $0.
    if (cheat) return;

    // If the app is still doing its initial load, WAIT. 
    // Do not panic. Do not fetch. Just wait for the data to arrive.
    if (loading) return;

    // --- MEMORY SEARCH ---
    // The global list is ready. Let's find our item in memory.
    const found = cheats?.find(c => c.id === parseInt(id, 10));

    if (found) {
      setCheat(found);
    } else {
      // If we looked through the downloaded list and it's not there,
      // only then do we redirect.
      navigate("/");
    }
  }, [id, cheat, loading, cheats, navigate]);

  if (!cheat) return <p>Loading cheat...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{cheat.title}</h2>
      <pre>{cheat.code}</pre>
      <p>{cheat.notes}</p>
      <p>Created: {cheat.created_at && <DateTimeInline value={cheat.created_at} />}</p>
      <p>Updated: {cheat.updated_at && <DateTimeInline value={cheat.updated_at} />}</p>
    </div>
  );
}