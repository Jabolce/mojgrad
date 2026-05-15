import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Settings, AlertCircle } from "lucide-react";
import logo from "../../assets/logo.png";

const menuItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Контролна табла" },
  { path: "/admin/institutions", icon: Building2, label: "Институции" },
  { path: "/admin/users", icon: Users, label: "Корисници" },
  { path: "/admin/settings", icon: Settings, label: "Подесувања" },
];

const Sidebar = () => {
  return (
    <div 
      className="fixed top-0 left-0 h-screen bg-white flex flex-col"
      style={{ width: 260, boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)", zIndex: 1000 }}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3.5">
          <img 
            src={logo} 
            alt="Мој Град Logo" 
            className="w-10 h-10 rounded-xl object-contain"
          />
          <h1 
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#0a96f4" }}
          >
            Мој Град
          </h1>
        </div>
      </div>

      <nav className="mt-6 px-3 flex-1">
        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => {
                const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 font-semibold text-sm no-underline cursor-pointer";
                const activeClass = isActive 
                  ? "text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
                return `${baseClass} ${activeClass}`;
              }}
              style={({ isActive }) => isActive ? { backgroundColor: "#0a96f4", textDecoration: "none" } : { textDecoration: "none" }}
              end={item.path === "/admin"}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
          style={{ 
            backgroundColor: "#0a96f4",
            boxShadow: "0 4px 14px rgba(10, 150, 244, 0.35)"
          }}
        >
          <AlertCircle size={18} />
          Пријави проблем
        </button>
      </div>

      <div style={{ height: 24 }}></div>
    </div>
  );
};

export default Sidebar;