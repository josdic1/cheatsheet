import { DateTimeInline } from "../components/DateTimeInline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CheatItem({ cheat }) {
  const { deleteCheat } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this cheat?")) {
      await deleteCheat(parseInt(cheat.id));
      navigate("/");
    }
  };

  return (
    <>
      <tr>
        <td>{cheat.title}</td>
        <td>{cheat.code}</td>
        <td>{cheat.notes}</td>
        <td>
          <DateTimeInline value={cheat.created_at} />
        </td>
        <td>
          <DateTimeInline value={cheat.updated_at} />
        </td>
        <td>
          <div>
            <button
              onClick={() =>
                navigate(`/cheats/${cheat.id}`, { state: { cheat } })
              }
            >
              View
            </button>
            <button
              name="edit"
              onClick={() => navigate(`/cheats/${cheat.id}/edit`)}
            >
              Edit
            </button>
            <button name="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
