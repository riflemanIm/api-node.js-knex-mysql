const noda = {
  "addAttachment.cancel": "Cancel",
  "addAttachment.eeee.rrr": "Выберите фото или видео",
  "addAttachment.takePhoto": "Take photo",
  "addAttachment.uploadDocument": "Upload document",
  "addAttachment.uploadMedia": "Upload photo/video",
  "addAttachment.uploadPhoto": "Upload photo",
  messagesPlaceholder: "No messages yet.",
  placeholder: "Message...",
  routeName: "Chat with doctor",
  serviceMessage: "Service message",
};

function setDeep(obj, path, value) {
  const arr = path.split(".");
  //  console.log("value", value);
  arr.reduce((acc, key, level) => {
    if (typeof acc[key] === "undefined" && level !== arr.length) {
      acc[key] = {};
    }

    if (level === arr.length - 1) {
      acc[key] = value;
      return value;
    }
    return acc[key];
  }, obj);
}

function tranformNoda(noda) {
  const res = {};
  for (const [fullKey, value] of Object.entries(noda)) {
    setDeep(res, fullKey, value);
  }
  return res;
}
console.log("==", tranformNoda(noda));
