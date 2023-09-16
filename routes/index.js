const router = require("express").Router();
const {
  availableEndPointsHandler,
  createNewBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/index");

router.get("/", (_, res) => availableEndPointsHandler(res));
router.get("/blogs", (_, res) => getAllBlogs(res));
router.get("/blog", (req, res) => getBlogById(req, res));
router.post("/blog", (req, res) => createNewBlog(req, res));
router.put("/blog", (req, res) => updateBlogById(req, res));
router.delete("/blog", (req, res) => deleteBlogById(req, res));

module.exports = router;
