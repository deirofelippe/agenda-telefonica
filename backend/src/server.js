import app from "./app.js";
import db from "./database/index.js";

const PORT = process.env.API_PORT || 3000;

(async () => {
  try {
    await db.sync();
    console.log("Database sync...");

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    await db.close();
  }
})();
