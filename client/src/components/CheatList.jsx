import { CheatItem } from "../components/CheatItem";
import { NoResults } from "./NoResults";

export function CheatList({ cheats }) {
  if (!cheats || cheats.length === 0) {
    return <NoResults />;
  }
  return (
    <>
    <table>
    <thead>
        <tr>
        <th>Title</th>
        <th>Code</th>
        <th>Notes</th>
         <th>Created</th>
        <th>Updated</th>
        </tr>
    </thead>
    <tbody>
              {cheats.map(cheat => (
        <CheatItem key={cheat.id} cheat={cheat} />
      ))}
    </tbody>
</table>
    </>
  );
}

