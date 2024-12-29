import { encodeBase32UpperCaseNoPadding } from "@oslojs/encoding";

export function generateRandomOTP() {
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);
    const code = encodeBase32UpperCaseNoPadding(bytes);
    return code;
}

export function generateRandomRecoveryCode() {
    const recovery_code_bytes = new Uint8Array(10);
    crypto.getRandomValues(recovery_code_bytes);
    const recovery_code = encodeBase32UpperCaseNoPadding(recovery_code_bytes);
    return recovery_code;
}