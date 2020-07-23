const noda = {
  "addAttachment.cancel": "Cancel",
  "addAttachment.eeee.rrr": "Выберите фото или видео",
  exKey1: "Доступ к фото запрещен. Откройте доступ в настройках устройства",
  "addAttachment.takePhoto": "Take photo",
  "addAttachment.uploadDocument": "Upload document",
  "addAttachment.uploadMedia": "Upload photo/video",
  "addAttachment.uploadPhoto": "Upload photo",
  messagesPlaceholder: "No messages yet.",
  placeholder: "Message...",
  routeName: "Chat with doctor",
  serviceMessage: "Service message",
};
let exKey1 = () => {
  const res = {};
  for (const [fullKey, value] of Object.entries(noda)) {
    fullKey.split(".").forEach((key, inx) => {
      //if ()
      res[key] = { key: value };
    });

    //console.log("key", key, "value", value);
  }
  console.log("==", res);
};
exKey1();
