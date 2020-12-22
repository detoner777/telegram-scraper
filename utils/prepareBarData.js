const mapedBarData = (messages) => {
  return messages.map((item, index) => {
    let role = null;
    let direction = null;

    const messageStrArr = item["message"].split("\n");
    let mediaCaptionStrArr = [];

    if (
      item !== undefined &&
      item.media !== undefined &&
      item.media.caption !== undefined
    ) {
      mediaCaptionStrArr = item["media"]["caption"].split("\n");
    }
    const checkRole = (string) => {
      if (
        string.trim().toLowerCase().includes("водій") ||
        string.trim().toLowerCase().includes("водитель") ||
        string.trim().toLowerCase().includes("водиель") ||
        string.trim().toLowerCase().includes("водії")
      ) {
        if (string.length < 50) role = "driver";
        return;
      } else if (
        string.toLowerCase().includes("пасажир") ||
        string.toLowerCase().includes("пассажир") ||
        string.toLowerCase().includes("пассажыр") ||
        string.toLowerCase().includes("пасажыр")
      ) {
        if (string.length < 50) role = "passenger";
        return;
      }
      return;
    };

    const chekDirection = (string) => {
      if (
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("фастівкиїв") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("фастовкиїв") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("фастівкиев") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("фаствкиев") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("фастовкиев")
      ) {
        if (string.length < 50) direction = "fastov-kiev";
        return;
      }

      if (
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("київфастів") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("київфастов") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("київфаств") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("киевфастов") ||
        string
          .replace(/\-/g, "")
          .replace(/\↔/g, "")
          .replace(/\->/g, "")
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes("киевфаств")
      ) {
        if (string.length < 50) direction = "kiev-fastov";
        return;
      }
    };

    messageStrArr.forEach((string) => {
      checkRole(string);
      chekDirection(string);
      return;
    });

    mediaCaptionStrArr.forEach((string) => {
      checkRole(string);
      chekDirection(string);
      return;
    });

    return { ...item, role, direction };
  });
};

module.exports = {
  mapedBarData,
};
