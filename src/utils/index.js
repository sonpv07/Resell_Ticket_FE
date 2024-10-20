const returnValue = (success, data, message) => {
  return {
    success,
    data,
    message,
  };
};

const getTagColor = (category) => {
  switch (category) {
    case "Theater":
      return "#f44336";
    case "Concert":
      return "#2196f3";
    case "Festival":
      return "#ff9800";
    case "Sport":
      return "#acd8a7";
    default:
      return "#000";
  }
};

const currencyFormatter = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);

  return formatter;
};

module.exports = { returnValue, getTagColor, currencyFormatter };
