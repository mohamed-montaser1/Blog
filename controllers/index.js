const blogModel = require("../models/blog");
const checkImageUrlValidation = require("../utilities/checkImageUrlValidation");

const availableEndPoints = [
  { endPoint: "/blogs", method: "GET" },
  { endPoint: "/blog/{number}", method: "GET" },
  { endPoint: "/blog", method: "POST" },
  { endPoint: "/blog/update?id={number}", method: "PUT" },
  { endPoint: "/blog/delete?id={number}", method: "DELETE" },
];

async function availableEndPointsHandler(res) {
  res.json({ availableEndPoints });
}

async function getAllBlogs(res) {
  try {
    const blogs = await blogModel.find();
    if (Array.isArray(blogs)) {
      return res.json({
        success: true,
        blogs,
        length: blogs.length,
      });
    }
  } catch (error) {
    return res.json({
      success: true,
      message: `This error happend when server tries to get blogs from db`,
    });
  }
}

async function getBlogById(req, res) {
  const { id } = req.query;
  try {
    const blog = await blogModel.findById(id);
    return res.json({ success: true, blog });
  } catch (error) {
    return res.json({
      success: false,
      message: `This error happend when server tries to get blog data with id of ${id} The error in more details => ${error}`,
    });
  }
}

async function createNewBlog(req, res) {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(401).json({
      success: false,
      message: "Bad request - You must enter valid values",
    });
  }
  if (!checkImageUrlValidation(image)) {
    return res.json({
      success: false,
      message: "Please enter a valid image url",
    });
  }

  const newBlog = new blogModel({
    title,
    description,
    image,
  });
  try {
    await newBlog.save().then(() =>
      res.json({
        success: true,
        message: "Created blog successfully",
      })
    );
  } catch (error) {
    return res.json({
      success: false,
      message: `There is an error while saving the create blog: Error in more details => ${error}`,
    });
  }
}

async function updateBlogById(req, res) {
  const { id } = req.query;
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.json({
      success: true,
      message: `Cannot find blog with ${id} id`,
    });
  }
  try {
    await blogModel.findByIdAndUpdate(id, { ...req.body }).then(() => {
      return res.json({
        success: true,
        message: "Updated successfully!",
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `This error happend when server try to save the updated blog. Error in details => ${error}`,
    });
  }
}

async function deleteBlogById(req, res) {
  const { id } = req.query;
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.json({
      success: true,
      message: `Cannot find blog with ${id} id`,
    });
  }
  try {
    await blogModel.findByIdAndDelete(id, { ...req.body }).then(() => {
      return res.json({
        success: true,
        message: "Deleted successfully!",
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `This error happend when server try to delete the blog. Error in details => ${error}`,
    });
  }
}

module.exports = {
  availableEndPointsHandler,
  getAllBlogs,
  getBlogById,
  createNewBlog,
  updateBlogById,
  deleteBlogById,
};
