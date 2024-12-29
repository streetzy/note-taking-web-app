import { User } from "$lib/models/models";

export function verify_email_input(email: string) {
    return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function check_email_availability(email: string) {
    const user_email_count = await User.countDocuments({ email }).exec();
    return user_email_count === 0;
}