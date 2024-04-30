export const NotesLoader = async ({ params: { folderId } }) => {
  // console.log({ params });
  const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id,
        name,
        notes {
          id,
          content
        }
      }
    }`;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId,
      },
    }),
  });
  const { data } = await res.json();
  console.log("data 2", { data });
  return data;
};
export const noteLoader = async ({ params: { noteId } }) => {
  // console.log({ params });
  const query = `query Folder($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }`;
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId,
      },
    }),
  });
  const { data } = await res.json();
  console.log("data 2", { data });
  return data;
};
