import mongoose, { Mongoose, type Date } from "mongoose";

const user_schema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar_image: {
        data: Buffer,
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
    parent_notebook: { type: mongoose.Schema.Types.ObjectId, ref: "notebook", required: true },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "page" }],
});

const editor_content_schema = new mongoose.Schema<IEditor_Content>({
    time: { type: String, required: true},
    blocks: { type: [Object], required: true},
    version: { type: String, required: true}
})

const page_schema = new mongoose.Schema<IPage>({
    name: { type: String, required: true },
    editorjs_content: { type: editor_content_schema, required: true },
    parent_section: { type: mongoose.Schema.Types.ObjectId, ref: "section", required: true }
});


const session_schema = new mongoose.Schema<ISession>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    expires_at: { type: Number, required: true }
});

const email_verification_request_schema = new mongoose.Schema<IEmailVerification>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    email: { type: String, required: true },
    code: { type: String, required: true },
    expires_at: { type: Number, required: true }
});

const password_reset_session_schema = new mongoose.Schema<IPasswordReset>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    expires_at: { type: Number, required: true }
});

export interface IEditor_Content {
    time: string,
    blocks: { type: string, data: object[]}[],
    version: string,
}

export interface IEmailVerification {
    user: mongoose.Types.ObjectId,
    email: String,
    code: String,
    expires_at: number
};

export interface IPasswordReset {
    user: mongoose.Types.ObjectId,
    email: String,
    code: String,
    expires_at: number
};

export interface ISession {
    user: mongoose.Types.ObjectId,
    expires_at: number
};

export interface IUser {
    username: String,
    email: String,
    password: String,
    avatar_image?: {
        data: Buffer
    },
    notebooks: [mongoose.Types.ObjectId]

};

export interface INotebook {
    name: String,
    author: mongoose.Types.ObjectId,
    sections?: mongoose.Types.ObjectId[]
};

export interface ISection {
    name: String,
    parent_notebook: mongoose.Types.ObjectId,
    pages?: mongoose.Types.ObjectId[]
};

export interface IPage {
    name: String,
    editorjs_content: {
        time: number,
        blocks: { type: String, data: Object }[],
        version: String,
    }
    parent_section: mongoose.Types.ObjectId,
};

export const Password_reset_session = mongoose.models["Password Reset Session"] || mongoose.model("Password Reset Session", password_reset_session_schema);
export const Email_verification_request = mongoose.models["Email Verification Request"] || mongoose.model("Email Verification Request", email_verification_request_schema);
export const Session = mongoose.models["Session"] || mongoose.model("Session", session_schema);
export const User = mongoose.models["User"] || mongoose.model("User", user_schema);
export const Notebook = mongoose.models["Notebook"] || mongoose.model("Notebook", notebook_schema);
export const Section = mongoose.models["Section"] || mongoose.model("Section", section_schema);
export const Page = mongoose.models["Page"] || mongoose.model("Page", page_schema);
