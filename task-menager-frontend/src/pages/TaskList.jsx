import { useState, useMemo } from "react"; // Rimosso useCallback se non usato altrove
import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import debounce from "lodash.debounce";
import './TaskList.css';


const statusOrder = { "To do": 1, "Doing": 2, "Done": 3 };

function TaskList() {
  const { tasks, loading } = useGlobalContext();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchQuery(value), 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      let result = 0;
      if (sortBy === "title") {
        result = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        result = (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      } else if (sortBy === "createdAt") {
        result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return result * sortOrder;
    });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  if (loading) {
    return <div className="main-content">Caricamento task in corso...</div>;
  }

  const getSortIcon = (column) => {
    if (sortBy !== column) return "";
    return sortOrder === 1 ? " ▲" : " ▼";
  };

  return (
    <div className="main-content">
      <h1>Elenco dei Task</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Cerca un task per nome..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {tasks.length === 0 ? (
        <p>Ottimo lavoro! Non ci sono task nella lista.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("title")} className={sortBy === "title" ? "active-sort" : ""}>
                Nome {getSortIcon("title")}
              </th>
              <th onClick={() => handleSort("status")} className={sortBy === "status" ? "active-sort" : ""}>
                Stato {getSortIcon("status")}
              </th>
              <th onClick={() => handleSort("createdAt")} className={sortBy === "createdAt" ? "active-sort" : ""}>
                Data {getSortIcon("createdAt")}
              </th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}

      {filteredAndSortedTasks.length === 0 && tasks.length > 0 && (
        <p className="no-results">Nessun task trovato per "{searchQuery}"</p>
      )}
    </div>
  );
}

export default TaskList;