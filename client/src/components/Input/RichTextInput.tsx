import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import "./inputs.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'draft-js/dist/Draft.css';
import { createFile } from '../../api/file';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import JoditEditor from 'jodit-react';

type Props = {
    label: string;
    state: any
    setState: Dispatch<SetStateAction<any>>
    name: string;
};

const RichTextInput = ({label, state, setState, name}: Props) => {
    const editor = useRef(null);
    const [content, setContent] = useState(state?.[name] ?  String(state?.[name]) : "");
    const getToken = useSilentAdminTokenRefresh();

    // const getDraftState = (value = "") => {
    //     const blocksFromHtml = htmlToDraft(value);
    //     const { contentBlocks, entityMap } = blocksFromHtml;
    //     const contentState = ContentState.createFromBlockArray(
    //         contentBlocks,
    //         entityMap
    //     );
    //     return EditorState.createWithContent(contentState);
    // };
    //
    // const [editorState, setEditorState] = useState(getDraftState(state?.[name] ?  String(state?.[name]) : ""));
    //
    // const onEditorStateChange = (editorState: EditorState) => {
    //     setEditorState(editorState);
    //     console.log(convertToRaw(editorState.getCurrentContent()));
    //     setState((prev: any) => ({ ...prev, [name]: draftToHtml(convertToRaw(editorState.getCurrentContent())) }));
    // };

    // function uploadImageCallBack(file: string | Blob) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             const data = new FormData();
    //             data.append('file', file);
    //
    //             try {
    //                 getToken()
    //                     .then((token) => {
    //                         if (!token) return;
    //                         createFile(token, data)
    //                             .then((res) => {
    //                                 res.json()
    //                                     .then((data) => {
    //                                         setState((prev: any) => ({ ...prev, [name]: data.url }));
    //                                         resolve({ data: { link: data.url }})
    //                                     })
    //                                     .catch((error) => {
    //                                         console.log(error);
    //                                         reject(error);
    //                                     });
    //                             });
    //                     });
    //             } catch (error) {
    //                 console.error('Error uploading image', error);
    //             }
    //         }
    //     );
    // }



    // const toolbarOptions = {
    //     options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image'], //, 'fontSize'
    //     inline: {
    //         inDropdown: false,
    //         options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'], // removed 'monospace'
    //     },
    //     image: {
    //         uploadEnabled: true,
    //         uploadCallback: uploadImageCallBack,
    //         previewImage: true,
    //     }
    // }

    function dataURItoBlob(dataURI: string) {
        // Convert base64 to raw binary data held in a string
        const byteString = atob(dataURI.split(',')[1]);

        // Separate out the MIME component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // Write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);

        // Create a view into the buffer
        const ia = new Uint8Array(ab);

        // Set the bytes of the buffer to the correct values
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // Write the ArrayBuffer to a blob and return it
        return new Blob([ab], { type: mimeString });
    }

    // const localizationOptions = {
    //     // Generic
    //     "generic.add": "Přidat",
    //     "generic.cancel": "Zrušit",
    //
    //     // BlockType
    //     "components.controls.blocktype.h1": "Nadpis 1",
    //     "components.controls.blocktype.h2": "Nadpis 2",
    //     "components.controls.blocktype.h3": "Nadpis 3",
    //     "components.controls.blocktype.h4": "Nadpis 4",
    //     "components.controls.blocktype.h5": "Nadpis 5",
    //     "components.controls.blocktype.h6": "Nadpis 6",
    //     "components.controls.blocktype.blockquote": "Citace",
    //     "components.controls.blocktype.code": "Kotva",
    //     "components.controls.blocktype.blocktype": "Typ bloku",
    //     "components.controls.blocktype.normal": "Normal",
    //
    //     // Color Picker
    //     "components.controls.colorpicker.colorpicker": "Výběr barvy",
    //     "components.controls.colorpicker.text": "Text",
    //     "components.controls.colorpicker.background": "Zvýraznění",
    //
    //     // Embedded
    //     "components.controls.embedded.embedded": "Vsazený obsah",
    //     "components.controls.embedded.embeddedlink": "Vsazený odkaz",
    //     "components.controls.embedded.enterlink": "Vložte odkaz",
    //
    //     // Emoji
    //     "components.controls.emoji.emoji": "Emoji",
    //
    //     // FontFamily
    //     "components.controls.fontfamily.fontfamily": "Font",
    //
    //     // FontSize
    //     "components.controls.fontsize.fontsize": "Velikost písma",
    //
    //     // History
    //     "components.controls.history.history": "Historie",
    //     "components.controls.history.undo": "Zpět",
    //     "components.controls.history.redo": "Znovu",
    //
    //     // Image
    //     "components.controls.image.image": "Obrázek",
    //     "components.controls.image.fileUpload": "Nahrát obrázek",
    //     "components.controls.image.byURL": "URL",
    //     "components.controls.image.dropFileText": "Přetáhněte obrázek nebo klikněte pro výběr",
    //
    //     // Inline
    //     "components.controls.inline.bold": "Tučně",
    //     "components.controls.inline.italic": "Kurzíva",
    //     "components.controls.inline.underline": "Podtrženě",
    //     "components.controls.inline.strikethrough": "Přeškrtnutě",
    //     "components.controls.inline.monospace": "Strojové písmo",
    //     "components.controls.inline.superscript": "Horní index",
    //     "components.controls.inline.subscript": "Spodní index",
    //
    //     // Link
    //     "components.controls.link.linkTitle": "Název odkazu",
    //     "components.controls.link.linkTarget": "Odkaz",
    //     "components.controls.link.linkTargetOption": "Otevřít v novém okně",
    //     "components.controls.link.link": "Přidat odkaz",
    //     "components.controls.link.unlink": "Odebrat odkaz",
    //
    //     // List
    //     "components.controls.list.list": "Seznam",
    //     "components.controls.list.unordered": "Odrážky",
    //     "components.controls.list.ordered": "Číslování",
    //     "components.controls.list.indent": "Odsadit",
    //     "components.controls.list.outdent": "Odebrat odsazení",
    //
    //     // Remove
    //     "components.controls.remove.remove": "Odebrat styl",
    //
    //     // TextAlign
    //     "components.controls.textalign.textalign": "Zarovnání",
    //     "components.controls.textalign.left": "Doleva",
    //     "components.controls.textalign.center": "Nastřed",
    //     "components.controls.textalign.right": "Doprava",
    //     "components.controls.textalign.justify": "Zarovnat do bloku"
    // };

    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: 'Start typings...',
            buttons: "bold,italic,underline,strikethrough,eraser,ul,ol,paragraph,superscript,subscript,image,copyformat,table,link,undo,redo",
            uploader: {
                insertImageAsBase64URI: true, // Disable base64 image upload
                url: "", // Not needed since we're handling uploads manually
                isSuccess: (resp: any) => resp.ok, // Check if the response is successful
                defaultHandlerSuccess: async function (data: any) {
                    try {
                        // Create FormData with the file

                        const formData = new FormData();
                        const file = dataURItoBlob(data.files[0]); // Get the uploaded file
                        formData.append("file", file); // Append file to FormData


                        const adminToken = await getToken(); // Get the admin token
                        // Use createFile to upload the image
                        const response = await createFile(adminToken, formData);

                        if (response.ok) {
                            const responseData = await response.json();
                            const imageUrl = responseData.url; // Assuming your API returns the image URL
                            console.log(imageUrl, editor);

                            // Insert the uploaded image into the editor
                            // @ts-ignore
                            this.selection.insertImage(imageUrl, null, 200);
                        } else {
                            console.error("Image upload failed");
                        }
                    } catch (error: any) {
                        console.error("Error uploading image:", error.message);
                    }
                },
                defaultHandlerError: (error: any) => {
                    console.error("Image upload error:", error);
                },
            },
        }),
        []
    );

    const onEditorChange = (editorState: string) => {
            setContent(editorState);
            setState((prev: any) => ({ ...prev, [name]: editorState }));
        };

    return (
        <div>
            <label className={"inputLabel"}>{label}</label>
            {/*<Editor*/}
            {/*    editorState={editorState}*/}
            {/*    toolbarClassName="toolbarClassName"*/}
            {/*    wrapperClassName={"wrapperClassName"}*/}
            {/*    editorClassName="editorClassName"*/}
            {/*    placeholder="Místo pro váš obsah"*/}
            {/*    onEditorStateChange={onEditorStateChange}*/}
            {/*    toolbar={toolbarOptions}*/}
            {/*    localization={{locale: 'cs',*/}
            {/*        translations: localizationOptions}}*/}
            {/*/>*/}
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={onEditorChange}
            />
        </div>
    )
}

export default RichTextInput