import { graphQLRequest } from "./request";
export const NotesLoader = async ({ params: { folderId } }) => {
  // console.log({ params });
  const query = `query Notes($folderId: String!) {
      folder(folderId: $folderId) {
        id,
        name
        notes {
          id,
          content
        }
      }
    }`;

  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;
};
export const noteLoader = async ({ params: { noteId } }) => {
  // console.log({ params });
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }`;
  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};
// eslint-disable-next-line no-unused-vars
export const addNewNote = async ({ request }) => {
  const newNote = await request.formData();
  const formDataObject = {};
  newNote.forEach((value, key) => (formDataObject[key] = value));
  const query = `mutation Mutation($content: String!, $folderId: ID!){
    addNote(content: $content, folderId: $folderId){
      id
      content
    }
  }`;
  const { addNote } = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  console.log({ addNote });
  return addNote;
};
export const updateNote = async ({ request }) => {
  const updatedNote = await request.formData();
  const formDataObject = {};
  updatedNote.forEach((value, key) => (formDataObject[key] = value));

  const query = `mutation Mutation($id: String!, $content: String!){
    updateNote(id: $id,content: $content){
      id
      content
    }
  }`;
  const { updateNote } = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  console.log({ updateNote });
  return updateNote;
};
