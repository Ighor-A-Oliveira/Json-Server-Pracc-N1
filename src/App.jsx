import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state


  useEffect(() => {
    axios
      .get("http://localhost:3001/users") // Make sure the URL is correct
      .then((response) => {
        console.log(response)
        setUsers(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch users."); // Set error message
        setLoading(false); // Stop loading
      });

  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-neutral-500 font-sans text-white">
        <h1 className="text-3xl mb-2">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-neutral-500 font-sans text-white">
        <h1 className="text-3xl mb-2">{error}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-neutral-500 font-sans text-white">
      <h1 className="text-3xl mb-2">Users</h1>
      <ul>
        {users.map((user) => (
          <li className="my-1 text-2xl text-center" key={user.id}>
            {user.id} {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
