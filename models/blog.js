const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "You must enter title for this blog"],
    minLength: 10,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "You must enter description for this blog"],
    minLength: 50,
  },
  image: {
    type: String,
    required: [true, "You must enter image for this blog"],
  },
});

blogSchema.pre("save", function () {
  const result = {
    id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
  };
  return result;
});

module.exports = model("Blog", blogSchema);
