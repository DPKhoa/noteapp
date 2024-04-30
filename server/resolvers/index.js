import fakeData from "../fakeData/index.js";
import FolderModel from "../models/FolderModel.js";

export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find();
      return folders;
      //   return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.find({
        id: folderId,
      });
      return foundFolder;
    },
    note: (parent, args) => {
      const nodeId = args.noteId;
      return fakeData.notes.find((note) => note.id === nodeId);
    },
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "123" });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    },
  },
};
