// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToHtml } from "draftjs-to-html";
export default function Note() {
  const note = {
    id: "9999",
    content: "<p>This is new note</p>",
  };
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  // eslint-disable-next-line no-unused-vars
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blockFromHtml = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blockFromHtml.contentBlocks,
      blockFromHtml.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  });
  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);
  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContext())));
  };
  return (
    <Editor EditorState={editorState} onEditorStateChange={handleOnChange} />
  );
}
