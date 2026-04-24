import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
