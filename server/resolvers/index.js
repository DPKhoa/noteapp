import fakeData from "../fakeData/index.js";
import AuthorModel from "../models/AuthorModel.js";
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
        _id: folderId,
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
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
