import { CheatItem } from "../components/CheatItem";
import { NoResults } from "./NoResults";

export function CheatList({ cheats }) {
  if (!cheats || cheats.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="retro-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>TAGS</th>
            <th>CODE SEQUENCE</th>
            <th>NOTES</th>
            <th>CREATED</th>
            <th>UPDATED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {cheats.map((cheat) => (
            <CheatItem key={cheat.id} cheat={cheat} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
