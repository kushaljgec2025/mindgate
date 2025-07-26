import conf from "@/conf/config";
import { Client, Databases, Account, ID, Storage } from "appwrite";

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);
export const storage = new Storage(appwriteClient);

type UserStats = {
  userid: string;
  question_attempted: number;
  question_corrected: number;
  test_attempted: number;
  global_rank: number;
};

export class AppwriteService {
  async createUserStats(stats: UserStats) {
    try {
      const collection = await databases.upsertDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionUserStats,
        stats.userid,
        {
          ...stats,
        }
      );
      if (collection) {
        console.log("User stats pushed successfully:", collection);
      }
    } catch (error: any) {
      console.error("Error pushing user stats:", error);
      throw error;
    }
  }

  async getUserStats(userId: string) {
    try {
      const stats = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionUserStats,
        userId
      );
      return stats;
    } catch (error: any) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  }
}

const appwriteServices = new AppwriteService();

export default appwriteServices;
