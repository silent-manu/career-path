const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const directory = path.join(__dirname, "logs");

    if (!fs.existsSync(directory)) {
      await fsPromises.mkdir(directory);
    }

    await fsPromises.appendFile(path.join(directory, "eventLog.txt"), logItem);
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
