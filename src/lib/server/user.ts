import { User } from "$lib/models/models";
import { generateRandomRecoveryCode } from "$lib/utils/utils";
import { hash_password } from "./password";

export function verify_username_input(username: string) {
    return username.length > 3 && username.length < 32 && username.trim() === username;
}

export async function create_user(email: string, username: string, password: string) {
    const password_hash = await hash_password(password);
    const user_data = new User({
        email,
        username,
        password: password_hash,
    });

    await user_data.save();

    return {
        id: user_data._id,
        username: user_data.username,
        email: user_data.email
    }
}

export async function update_user_username(user_id: string, _username: string) {
    await User.findByIdAndUpdate(user_id, { username: _username} ).exec();
}

export async function update_user_password(user_id: string, password: string) {
    const password_hash = await hash_password(password);
    await User.findByIdAndUpdate(user_id, { password: password_hash }).exec();
}

export async function update_user_email(user_id: string, _email: string) {
    await User.findByIdAndUpdate(user_id, { email: _email} ).exec();
}

export async function get_user_password_hash(user_id: string) {
    const user = await User.findById(user_id).select("password").exec();
    if (!user || !user.password) {
        throw new Error("invalid user id");
    }
    return user.password;
}

export async function get_user_from_email(email: string) {
    const user = await User.findOne({ email }).exec();
    if (!user) return null;

    return {
        id: user._id,
        email: user.email,
        username: user.username
    }
}

export interface _IUser {
    id: string,
    email: string,
    username: string
}
