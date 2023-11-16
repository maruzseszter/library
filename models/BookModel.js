import mongoose from 'mongoose';
//import { BOOK_STATUS, BOOK_TYPE } from '../utils/constants.js';
import { BOOK_TYPE } from '../utils/constants.js';
const BookSchema = new mongoose.Schema( 
  {
    // bookStatus: {
    //   type: String,
    //   enum: Object.values(BOOK_STATUS),
    //   //default: BOOK_STATUS.NEW,
    // },
    bookType: {
      type: String,
      enum: Object.values(BOOK_TYPE),
      //default: BOOK_TYPE.LANGUAGE_BOOK,
    },
    // bookLocation: {
    //   type: String,
    //   default: 'könyvtár',
    // },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Book', BookSchema);