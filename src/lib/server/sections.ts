import { Notebook, Section} from "$lib/models/models";

export async function update_section_name(notebook_id: string, section_id: string, _name: string) {
    const section = await Section.findById(section_id).exec();

    if (section.parent_notebook.toString() !== notebook_id) {
        return null;
    }

    await Section.findByIdAndUpdate(section_id, {name: _name}).exec()
}

export async function remove_section(notebook_id: string, section_id: string) {
    const section = await Section.findById(section_id).exec();

    if (section.parent_notebook.toString() !== notebook_id) {
        return null
    }

    await Section.findByIdAndDelete(section_id).exec();
}

export async function get_section_name(notebook_id: string, section_id: string) {
    const section = await Section.findById(section_id).exec();

    if (section.parent_notebook.toString() !== notebook_id) {
        return null
    }

    return section.name;
}

export async function create_section(name: string, notebook_id: string) {
    const notebook = await Notebook.findById(notebook_id).exec();

    if (!notebook) {
        return null;
    }
    const section_data = new Section({
        name: name,
        parent_notebook: notebook_id
    })

    await section_data.save();

    notebook.sections.push(section_data._id);
    await notebook.save();
}

export async function user_notebook_sections(user_id: string, notebook_id: string) {
    const notebook = await Notebook.findById(notebook_id).populate("sections").exec();

    if (notebook.author.toString() !== user_id) {
        return null;
    }

    const notebook_sections = notebook.sections;

    const sections_info : { section_id: string, section_name: string}[] = notebook_sections.map((section: { _id: string, name: string }) => {
        return {
            section_id: section._id.toString(),
            section_name: section.name
        }
    })

    return sections_info;
}