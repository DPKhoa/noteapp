// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";

export default function Note() {
  const { note } = useLoaderData();

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
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
}
