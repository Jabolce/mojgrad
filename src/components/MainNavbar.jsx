import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

const MainNavbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#0a96f4] font-semibold"
      : "text-gray-700 hover:text-[#0a96f4]";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#f5f9ff] border-b-2 border-blue-200 shadow">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[#0082f8] font-bold tracking-tight text-lg">МојГрад</h1>
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className={`transition ${isActive("/")}`}>
            Почетна
          </Link>

          <Link to="/report" className={`transition ${isActive("/report")}`}>
            Пријави Проблем
          </Link>

          <Link
            to="/problems"
            className={`transition ${isActive("/problems")}`}
          >
            Активни Проблеми
          </Link>

          <Link to="/map" className={`transition ${isActive("/map")}`}>
            Мапа
          </Link>

          <Link to="/about" className={`transition ${isActive("/about")}`}>
            За Нас
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
