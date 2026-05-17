import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainNavbar from "../components/MainNavbar";
import ReportCategorySelector from "../components/ReportCategorySelector";
import ReportDetails from "../components/ReportDetails";
import ReportUpload from "../components/ReportUpload";
import ReportMap from "../components/ReportMap";

import {
  getCategories,
  createReport,
  categoryMap,
  fileToDataUrl,
} from "../api/apiService";

function ReportForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [position, setPosition] = useState({ lat: 41.9981, lng: 21.4254 });
  const [submitting, setSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        const iconMap = {
          WATER: "🚰",
          FIRE: "🔥",
          ROAD: "🛣️",
          TRAFFIC: "🚦",
          WASTE: "🗑️",
          ELECTRICITY: "⚡",
          PUBLIC_SAFETY: "🛡️",
          OTHER: "❓",
        };
        const mapped = data.map((key) => ({
          key,
          icon: iconMap[key] || "❓",
          name: categoryMap[key]?.label || key,
        }));
        setCategories(mapped);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(null);
      return;
    }

    let cancelled = false;

    async function generatePreview() {
      try {
        const dataUrl = await fileToDataUrl(selectedFile);
        if (!cancelled) setImagePreview(dataUrl);
      } catch (err) {
        console.error("Preview generation error:", err);
      }
    }

    generatePreview();
    return () => { cancelled = true; };
  }, [selectedFile]);

  async function handleSubmit() {
    if (!selectedCategory || !description.trim()) {
      alert("Ве молиме изберете категорија и внесете опис.");
      return;
    }

    setSubmitting(true);

    try {
      const createdReport = await createReport({
        description: description.trim(),
        category: selectedCategory,
        latitude: position.lat,
        longitude: position.lng,
        image: selectedFile || undefined,
      });

      setSelectedCategory("");
      setDescription("");
      setSelectedFile(null);
      setImagePreview(null);
      navigate(`/case/${createdReport.id}`);
    } catch (err) {
      alert("Грешка при испраќање: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar />

      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr]">
        <section className="!px-5 sm:!px-8 lg:!px-12 !py-8 lg:!py-12 max-w-3xl mx-auto w-full">
          <h1 className="!text-3xl sm:!text-4xl !font-bold !text-gray-900">
            Пријави нов проблем
          </h1>

          <p className="!text-gray-600 !mt-4 !text-base sm:!text-lg !leading-relaxed">
            Вашата пријава директно помага за подобра и пофункционална
            заедница. Ве молиме пополнете ги задолжителните полиња.
          </p>

          <ReportCategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ReportDetails
            description={description}
            setDescription={setDescription}
          />

          <ReportUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            imagePreview={imagePreview}
          />

          <div className="!mt-12 !border !rounded-2xl !px-6 !py-5 !font-semibold !text-gray-700">
            ⓘ Со кликнување на „Испрати пријава", потврдувате дека наведените
            податоци се точни и локацијата на мапата е правилно означена.
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="!mt-8 !w-full !bg-orange-500 !text-white !font-bold !text-xl !py-5 !rounded-2xl shadow-lg hover:!bg-orange-600 !transition disabled:opacity-50"
          >
            {submitting ? "⏳ Се испраќа..." : "Испрати пријава"}
          </button>
        </section>

        <ReportMap position={position} setPosition={setPosition} />
      </main>
    </div>
  );
}

export default ReportForm;
