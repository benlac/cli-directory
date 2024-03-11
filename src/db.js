import fs from "node:fs/promises";
const DB_PATH = new URL("./db.json", import.meta.url).pathname;

export const insert = async (data) => {
  const db = await getDB();
  db.shops.push(data);
  await saveDB(db);
  return data;
};

const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};
