import mongoose, { type Date } from "mongoose";

const user_schema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar_image: {
    data: String,
    is_png: Boolean,
  },
  notebooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "notebook" }],
});

const notebook_schema = new mongoose.Schema<INotebook>({
  name: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "section" }],
});

const section_schema = new mongoose.Schema<ISection>({
  name: { type: String, required: true },
  parent_notebook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notebook",
    required: true,
  },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "page" }],
});

const page_schema = new mongoose.Schema<IPage>({
  name: { type: String, required: true },
  editorjs_content: { type: Object, default: () => ({}) },
  parent_section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    required: true,
  },
});

const session_schema = new mongoose.Schema<ISession>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  token: { type: String, required: true, unique: true },
  expires_at: { type: Number, required: true },
});

const email_verification_request_schema =
  new mongoose.Schema<IEmailVerification>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    expires_at: { type: Number, required: true },
  });

const password_reset_session_schema = new mongoose.Schema<IPasswordReset>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
  expires_at: { type: Number, required: true },
});

export interface IEditor_Content {
  time: string;
  blocks: { type: string; data: object[] }[];
  version: string;
}

export interface IEmailVerification {
  user: mongoose.Types.ObjectId;
  email: String;
  code: String;
  expires_at: number;
}

export interface IPasswordReset {
  user: mongoose.Types.ObjectId;
  email: String;
  code: String;
  expires_at: number;
}

export interface ISession {
  user: mongoose.Types.ObjectId;
  token: string;
  expires_at: number;
}

export interface IUser {
  username: String;
  email: String;
  password: String;
  avatar_image?: {
    data: string;
    is_png: boolean;
  };
  notebooks: [mongoose.Types.ObjectId];
}

export interface INotebook {
  name: String;
  author: mongoose.Types.ObjectId;
  sections?: mongoose.Types.ObjectId[];
}

export interface ISection {
  name: String;
  parent_notebook: mongoose.Types.ObjectId;
  pages?: mongoose.Types.ObjectId[];
}

export interface IPage {
  name: String;
  editorjs_content?: {
    time: number;
    blocks: { type: String; data: Object }[];
    version: String;
  };
  parent_section: mongoose.Types.ObjectId;
}

export const Password_reset_session =
  mongoose.models["password reset session"] ||
  mongoose.model("password reset session", password_reset_session_schema);
export const Email_verification_request =
  mongoose.models["email verification request"] ||
  mongoose.model(
    "email verification request",
    email_verification_request_schema
  );
export const Session =
  mongoose.models["session"] || mongoose.model("session", session_schema);
export const User =
  mongoose.models["user"] || mongoose.model("user", user_schema);
export const Notebook =
  mongoose.models["notebook"] || mongoose.model("notebook", notebook_schema);
export const Section =
  mongoose.models["section"] || mongoose.model("section", section_schema);
export const Page =
  mongoose.models["page"] || mongoose.model("page", page_schema);
