const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteCollectionUserStats: String(
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_STATS
  ),
  appwriteCollectionUserDetails: String(
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER_DETAILS
  ),
};

export default conf;
