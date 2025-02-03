import { User } from "$lib/models/models";

export async function check_username_availability(username: string) {
  const username_count = await User.countDocuments({ username }).exec();
  return username_count === 0;
}
