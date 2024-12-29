// See https://svelte.dev/docs/kit/types#app.d.ts

import type { _ISession } from "$lib/server/session";
import type { _IUser } from "$lib/server/user";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
        user: _IUser | null;
        session: _ISession | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
