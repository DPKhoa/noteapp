// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useMemo } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  // eslint-disable-next-line no-unused-vars
  const [rawHTML, setRawHTML] = useState(note?.content);

  useEffect(() => {
    const content = note?.content?.trim() || "";
    const blocksFromHTML = content ? convertFromHTML(content) : null;
    if (blocksFromHTML && blocksFromHTML.contentBlocks) {
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    } else {
      // Handle the case where blocksFromHTML is null or malformed
      setEditorState(EditorState.createEmpty());
    }
  }, [note?.content, note?.id]);

  console.log({ location });

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note?.content) return;
      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRawHTML(note?.content);
  }, [note?.content]);

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
