const Mongoose = require('mongoose');

const connect = () => {
  return Mongoose.connect('mongodb://127.0.0.1:27017/UnacademyMongoDemo'); // return a Promise
};

// definition of Schema ** this does  not create a collection **
const blog = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    tags: [{ type: String }],
  },
  { timestamps: true }
);
//  on adding the object parameter timestamp:true automatically mongoDB handles
// createdAt and  updatedAt times for you to help in debugging

// Creation of collection
const Blog = Mongoose.model('blog', blog);
// second parameter tell which schema to use ** once this line executes a document is created **

connect()
  .then(async (connection) => {
    const b = await Blog.create({
      title: 'Learn DP',
      description: 'Learn DP at unacademy',
    });
    console.log(b);
  })
  .catch((err) => console.error(err));
