export const formatDescriptionParts = (description) => {
  if (!description) {
    return {
      userReport: "",
      aiVision: "",
      userLabel: "Пријава на корисник",
      aiLabel: "AI опис",
    };
  }

  const aiSplit = description.split("AI vision:");

  let userReport = aiSplit[0]?.trim() || "";
  userReport = userReport
    .replace(/^Issue detected:\s*\w+\.\s*/i, "")
    .replace(/^User report:\s*/i, "")
    .trim();

  return {
    userReport,
    aiVision: aiSplit[1]?.trim() || "",
    userLabel: "Пријава на корисник",
    aiLabel: "AI опис",
  };
};
