import conf from "@/conf/config";
import { Client, Databases, Account, Storage, ID } from "appwrite";

let appwriteClient: Client | null = null;
let databases: Databases;
let account: Account;
let storage: Storage;

if (typeof window !== "undefined") {
  appwriteClient = new Client();
  appwriteClient
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

  databases = new Databases(appwriteClient);
  account = new Account(appwriteClient);
  storage = new Storage(appwriteClient);
}

// Use types so it doesn't break if used before initialization
type UserStats = {
  userid: string;
  question_attempted: number;
  question_corrected: number;
  test_attempted: number;
  global_rank: number;
};

export class AppwriteService {
  async createUserStats(stats: UserStats) {
    if (!databases) throw new Error("Appwrite client not initialized");
    return await databases.upsertDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionUserStats,
      stats.userid,
      { ...stats }
    );
  }

  async getUserStats(userId: string) {
    if (!databases) throw new Error("Appwrite client not initialized");
    return await databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionUserStats,
      userId
    );
  }
}

const appwriteServices = new AppwriteService();
export default appwriteServices;
