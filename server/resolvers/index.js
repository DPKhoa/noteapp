import fakeData from "../fakeData/index.js";
import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      console.log("parent :>> ", args);
      const folders = await FolderModel.find({
        authorId: args.uid,
      }).sort({
        updatedAt: "desc",
      });

      return folders;
      //   return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: (parent, args) => {
      const nodeId = args.noteId;
      return fakeData.notes.find((note) => note.id === nodeId);
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      });
      console.log({ notes });
      return notes;
      // return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addNote: async (parent, args, context) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
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
