import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.NEXT_PUBLIC_CLERK_SECRET_KEY,
});

export const getFullUserList = async () => {
  try {
    const userList = await clerkClient.users.getUserList();
    return userList;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};
