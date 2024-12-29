import { User, Notebook, type INotebook } from "$lib/models/models";

export async function update_notebook_name(user_id: string, notebook_id: string, _name: string) {
    const notebook = await Notebook.findById(notebook_id).exec();

    if (notebook.author.toString() !== user_id) {
        return null;
    }

    await Notebook.findByIdAndUpdate(notebook_id, {name: _name}).exec()
}

export async function remove_notebook(user_id: string, notebook_id: string) {
    const notebook = await Notebook.findById(notebook_id).exec();

    if (notebook.author.toString() !== user_id) {
        return null
    }

    await Notebook.findByIdAndDelete(notebook_id).exec();
}

export async function get_notebook_name(user_id: string, notebook_id: string) {
    const notebook = await Notebook.findById(notebook_id).exec();

    if (notebook.author.toString() !== user_id) {
        return null
    }

    return notebook.name;
}

export async function get_user_notebooks(user_id: string) {
    const user = await User.findById(user_id).populate("notebooks").exec();

    if (!user) {
        return null;
    }

    const user_notebooks = user.notebooks;

    const notebook_info : { notebook_id: string, notebook_name: string}[] = user_notebooks.map((notebook: { _id: string, name: string }) => {
        return {
            notebook_id: notebook._id.toString(),
            notebook_name: notebook.name
        }
    })

    return notebook_info;
}

export async function create_notebook(name: string, user_id: string) {
    const user = await User.findById(user_id).exec();

    if (!user) {
        return null;
    }
    const notebook_data = new Notebook({
        name: name,
        author: user_id
    })

    await notebook_data.save();

    user.notebooks.push(notebook_data._id);
    await user.save();
}