import {EditorState, ContentState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { Dispatch, SetStateAction, useState } from 'react';
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import "./inputs.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';

type Props = {
    label: string;
    state: any
    setState: Dispatch<SetStateAction<any>>
    name: string;
};

const RichTextInput = ({label, state, setState, name}: Props) => {
    const getDraftState = (value = "") => {
        const blocksFromHtml = htmlToDraft(value);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );
        return EditorState.createWithContent(contentState);
    };

    const [editorState, setEditorState] = useState(getDraftState(state?.[name] ?  String(state?.[name]) : ""));

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
        setState((prev: any) => ({ ...prev, [name]: draftToHtml(convertToRaw(editorState.getCurrentContent())) }));
    };

    const toolbarOptions = {
        options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image'], //, 'fontSize'
        inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'], // removed 'monospace'
        }
    }

    const localizationOptions = {
        // Generic
        "generic.add": "Přidat",
        "generic.cancel": "Zrušit",

        // BlockType
        "components.controls.blocktype.h1": "Nadpis 1",
        "components.controls.blocktype.h2": "Nadpis 2",
        "components.controls.blocktype.h3": "Nadpis 3",
        "components.controls.blocktype.h4": "Nadpis 4",
        "components.controls.blocktype.h5": "Nadpis 5",
        "components.controls.blocktype.h6": "Nadpis 6",
        "components.controls.blocktype.blockquote": "Citace",
        "components.controls.blocktype.code": "Blok kódu",
        "components.controls.blocktype.blocktype": "Typ bloku",
        "components.controls.blocktype.normal": "Normal",

        // Color Picker
        "components.controls.colorpicker.colorpicker": "Výběr barvy",
        "components.controls.colorpicker.text": "Text",
        "components.controls.colorpicker.background": "Zvýraznění",

        // Embedded
        "components.controls.embedded.embedded": "Vsazený obsah",
        "components.controls.embedded.embeddedlink": "Vsazený odkaz",
        "components.controls.embedded.enterlink": "Vložte odkaz",

        // Emoji
        "components.controls.emoji.emoji": "Emoji",

        // FontFamily
        "components.controls.fontfamily.fontfamily": "Font",

        // FontSize
        "components.controls.fontsize.fontsize": "Velikost písma",

        // History
        "components.controls.history.history": "Historie",
        "components.controls.history.undo": "Zpět",
        "components.controls.history.redo": "Znovu",

        // Image
        "components.controls.image.image": "Obrázek",
        "components.controls.image.fileUpload": "Nahrát obrázek",
        "components.controls.image.byURL": "URL",
        "components.controls.image.dropFileText": "Přetáhněte obrázek nebo klikněte pro výběr",

        // Inline
        "components.controls.inline.bold": "Tučně",
        "components.controls.inline.italic": "Kurzíva",
        "components.controls.inline.underline": "Podtrženě",
        "components.controls.inline.strikethrough": "Přeškrtnutě",
        "components.controls.inline.monospace": "Strojové písmo",
        "components.controls.inline.superscript": "Horní index",
        "components.controls.inline.subscript": "Spodní index",

        // Link
        "components.controls.link.linkTitle": "Název odkazu",
        "components.controls.link.linkTarget": "Odkaz",
        "components.controls.link.linkTargetOption": "Otevřít v novém okně",
        "components.controls.link.link": "Přidat odkaz",
        "components.controls.link.unlink": "Odebrat odkaz",

        // List
        "components.controls.list.list": "Seznam",
        "components.controls.list.unordered": "Odrážky",
        "components.controls.list.ordered": "Číslování",
        "components.controls.list.indent": "Odsadit",
        "components.controls.list.outdent": "Odebrat odsazení",

        // Remove
        "components.controls.remove.remove": "Odebrat styl",

        // TextAlign
        "components.controls.textalign.textalign": "Zarovnání",
        "components.controls.textalign.left": "Doleva",
        "components.controls.textalign.center": "Nastřed",
        "components.controls.textalign.right": "Doprava",
        "components.controls.textalign.justify": "Zarovnat do bloku"
    };

    return (
        <div>
            <label className={"inputLabel"}>{label}</label>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName={"wrapperClassName"}
                editorClassName="editorClassName"
                placeholder="Místo pro váš obsah"
                onEditorStateChange={onEditorStateChange}
                toolbar={toolbarOptions}
                localization={{locale: 'cs',
                    translations: localizationOptions}}
            />
        </div>
    )
}

export default RichTextInput