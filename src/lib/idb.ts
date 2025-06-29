import { DB_NAME, THREAD_LIST } from "@/constants";
import { ThreadListType } from "@/interfaces";
import { IDBPDatabase, openDB } from "idb";

// * Creates a connection to the IndexedDB database.
export const IndexDbConnection = async (): Promise<IDBPDatabase> => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(THREAD_LIST)) {
        db.createObjectStore(THREAD_LIST, { keyPath: 'threadId' });
      }
    },
  });
  return db;
};

// * Adds new record to the IndexedDB.
export const addThread = async (thread: ThreadListType) => {
  const db = await IndexDbConnection();
  await db.add(THREAD_LIST, thread);
};

// * Retrieves the list of threads from the IndexedDB.
export const getThreadList = async () => {
  const db = await IndexDbConnection();
  return await db.getAll(THREAD_LIST);
};


// * Updates an existing thread in the IndexedDB with new data.
export const updateThread = async (threadId: string, updatedData: ThreadListType) => {
  try {
    const db = await IndexDbConnection();
    const transaction = db.transaction(THREAD_LIST, "readwrite");
    const store = transaction.objectStore(THREAD_LIST);

    const thread = await store.get(threadId);
    if (!thread) {
      throw new Error("Thread not found");
    }

    const updatedThread = { ...thread, ...updatedData };
    await store.put(updatedThread);
    await transaction.done;

  } catch (error) {
    console.error("Error updating thread:", error);
  }
};