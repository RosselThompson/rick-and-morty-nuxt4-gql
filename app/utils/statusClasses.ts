export const getStatusDotClass = (status: string | undefined) => {
  if (!status) return "bg-gray-500";
  const statusLower = status.toLowerCase();
  if (statusLower === "alive") {
    return "bg-[#4CAF50]";
  } else if (statusLower === "dead") {
    return "bg-[#F44336]";
  } else {
    return "bg-gray-500";
  }
};

export const getStatusBadgeClass = (status: string | undefined) => {
  if (!status) return "bg-gray-100 text-gray-700";
  const statusLower = status.toLowerCase();
  if (statusLower === "alive") {
    return "bg-[#E8F5E9] text-[#2E7D32]";
  } else if (statusLower === "dead") {
    return "bg-[#FFEBEE] text-[#C62828]";
  } else {
    return "bg-gray-100 text-gray-700";
  }
};
