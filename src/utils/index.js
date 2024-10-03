const returnValue = (success, data, message) => {
  return {
    success,
    data,
    message,
  };
};

const getTagColor = (category) => {
  switch (category) {
    case "Concert":
      return "#f44336";
    case "Sport":
      return "#2196f3";
    case "Festival":
      return "#ff9800";
    default:
      return "#000";
  }
};

module.exports = { returnValue, getTagColor };
