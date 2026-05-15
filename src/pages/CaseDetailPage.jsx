import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Share2, MessageSquare, MapPin, Calendar, User,
  CheckCircle, Clock, ExternalLink, Send, Navigation,
} from "lucide-react";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const CaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  // Placeholder - ќе се поврзе со backend
  const caseData = {
    id: id || "—",
    category: "—",
    address: "—",
    date: "—",
    status: "pending",
    description: "",
    history: [],
    comments: [],
    supports: [],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9ff]">
      <MainNavbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-[#0a96f4] transition">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Детали за случај #{caseData.id}</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Пријавено од граѓанин во категорија:{" "}
                <span className="font-medium text-gray-700">{caseData.category}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm hover:border-[#0a96f4] hover:text-[#0a96f4] transition shadow-sm">
              <Share2 size={15} /> Сподели
            </button>
            <button onClick={() => setShowCommentBox((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a96f4] text-white text-sm font-semibold hover:bg-[#0082e0] transition shadow-sm">
              <MessageSquare size={15} /> Коментирај
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Image placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-video flex items-center justify-center">
              <p className="text-gray-400 text-sm">Слика ќе се вчита од backend</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-4">Опис на пријавата</h2>
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 min-h-[60px]">
                <p className="text-sm text-gray-400 italic">Описот ќе се вчита од backend.</p>
              </div>
            </div>

            {/* Comment box */}
            {showCommentBox && (
              <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4">
                  <MessageSquare size={17} className="text-[#0a96f4]" /> Нов коментар
                </h2>
                <div className="flex gap-3 items-end">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    ?
                  </div>
                  <div className="flex-1 flex gap-2">
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Напиши коментар..." rows={3}
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0a96f4] focus:ring-2 focus:ring-blue-100 transition resize-none" />
                    <button className="self-end px-3 py-2.5 bg-[#0a96f4] hover:bg-[#0082e0] text-white rounded-xl transition">
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Comments - empty */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4">
                <MessageSquare size={17} className="text-[#0a96f4]" /> Коментари
              </h2>
              <p className="text-sm text-gray-400 italic">Коментарите ќе се вчитаат од backend.</p>
            </div>

            {/* History - empty */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-800 mb-4">
                <Clock size={17} className="text-[#0a96f4]" /> Историја на случајот
              </h2>
              <p className="text-sm text-gray-400 italic">Историјата ќе се вчита од backend.</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {/* Info card */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-0.5">Информации за пријавата</h3>
              <p className="text-xs text-gray-400 mb-5">Брз преглед на основните податоци</p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 items-start pb-4 border-b border-gray-100">
                  <MapPin size={15} className="text-[#0a96f4] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Точна адреса</p>
                    <p className="text-sm text-gray-400 italic">—</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start pb-4 border-b border-gray-100">
                  <Calendar size={15} className="text-[#0a96f4] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Датум на пријавување</p>
                    <p className="text-sm text-gray-400 italic">—</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start pb-4 border-b border-gray-100">
                  <User size={15} className="text-[#0a96f4] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Пријавено од</p>
                    <p className="text-sm text-gray-400 italic">—</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Navigation size={15} className="text-[#0a96f4] mt-0.5 shrink-0" />
                  <div className="w-full">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Геолокација</p>
                    <div className="w-full h-28 rounded-xl bg-gray-100 flex items-center justify-center">
                      <p className="text-xs text-gray-400 italic">Мапата ќе се вчита од backend</p>
                    </div>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 mt-2 text-xs text-[#0a96f4] hover:underline font-medium">
                      Отвори во Google Maps <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reporter - empty */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm shrink-0">
                  ?
                </div>
                <div>
                  <p className="text-sm text-gray-400 italic">Пријавувачот ќе се вчита од backend</p>
                </div>
              </div>
              <div className="flex border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center gap-1 flex-1 py-2">
                  <span className="text-2xl font-bold text-gray-300">—</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">поддршки</span>
                </div>
                <div className="w-px bg-gray-100 my-2" />
                <div className="flex flex-col items-center gap-1 flex-1 py-2">
                  <span className="text-2xl font-bold text-gray-300">—</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">споделувања</span>
                </div>
              </div>
            </div>

            {/* Status change */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Смени статус</h3>
              <div className="flex flex-col gap-2">
                {[["pending","Во чекање"],["in-progress","Во тек"],["solved","Решен"]].map(([val, lbl]) => (
                  <button key={val}
                    className={`w-full py-2 rounded-xl text-sm font-medium transition border ${caseData.status === val ? "bg-[#0a96f4] text-white border-[#0a96f4]" : "bg-white text-gray-600 border-gray-200 hover:border-[#0a96f4] hover:text-[#0a96f4]"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default CaseDetailPage;
