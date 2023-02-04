const { createArticle, deleteArticle, fetchArticle, fetchArticles } = require("../controllers/articles.controller");
const verifyAuth = require("../middlewares/auth.middleware");

const articleRouter = require("express").Router();

articleRouter.post("/create", verifyAuth, createArticle);
articleRouter.get("/post/:id", fetchArticle);
articleRouter.get("/all", fetchArticles);
articleRouter.post("/delete/:id", verifyAuth, deleteArticle);

module.exports = articleRouter;