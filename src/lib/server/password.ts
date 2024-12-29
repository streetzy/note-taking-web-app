import { hash, verify} from "@node-rs/argon2";

export async function hash_password(password: string) {
    return await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
}

export async function verify_password_hash(hash: string, password: string) {
    return await verify(hash, password);
}