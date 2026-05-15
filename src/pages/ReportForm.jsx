import { useState } from "react";
import { useApp, CATEGORIES } from "../context/AppContext";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const ReportForm = () => {
  const { addCase } = useApp();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!address.trim() || !description.trim()) {
      setError("Пополни ги сите полиња.");
      return;
    }
    setError("");
    const now = new Date();
    const dateStr = now.toLocaleDateString("mk-MK", { day: "numeric", month: "long", year: "numeric" });
    const timeStr = now.toLocaleTimeString("mk-MK", { hour: "2-digit", minute: "2-digit" });
    const newCase = {
      id: Math.floor(Math.random() * 1000) + 3500,
      category, status: "pending", address, date: dateStr,
      reportedById: 1,
      description, supports: [], comments: [],
      history: [{ date: dateStr, time: timeStr, text: "Пријавата е поднесена." }],
    };
    addCase(newCase);
    setSuccess(true);
  };

  const handleReset = () => {
    setCategory(CATEGORIES[0]);
    setAddress("");
    setDescription("");
    setError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9ff]">
      <MainNavbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Пријави нов проблем</h1>
          <p className="text-sm text-gray-400 mt-0.5">Пополни ги деталите за пријавата</p>
        </div>

        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 flex flex-col gap-6">
          {error && <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>}
          {success && (
            <div className="flex flex-col gap-3">
              <div className="px-4 py-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl">✓ Пријавата е успешно поднесена!</div>
              <button onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-[#0a96f4] hover:bg-[#0082e0] text-white text-sm font-semibold transition">
                Поднеси нова пријава
              </button>
            </div>
          )}

          {!success && (
            <>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Категорија</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${category === cat ? "bg-[#0a96f4] text-white border-[#0a96f4]" : "bg-white text-gray-600 border-gray-200 hover:border-[#0a96f4]"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Адреса / Локација</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="ул. Пример бр. 1, Скопје"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0a96f4] focus:ring-2 focus:ring-blue-100 transition" />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Опис на проблемот</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опиши го проблемот детално..." rows={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0a96f4] focus:ring-2 focus:ring-blue-100 transition resize-none" />
              </div>

              <button onClick={handleSubmit}
                className="w-full py-2.5 rounded-xl bg-[#0a96f4] hover:bg-[#0082e0] text-white text-sm font-semibold transition">
                Поднеси пријава
              </button>
            </>
          )}
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default ReportForm;
