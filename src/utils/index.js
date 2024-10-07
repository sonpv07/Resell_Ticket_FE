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
    default:
      return "#000";
  }
};

module.exports = { returnValue, getTagColor };
