const articleModel = require("../models/article.schema");

async function createArticle(req, res, next) {
  const { title, content } = req.body;
  const user = req.user;


  try{

    //check if user has access to write
    if (!hasWriteAccess(user.user_type)) {
      res.json({
        message: "access denied, you need to be either an author or a guest author to be able to write an article",
        success: false,
      })
    }


    if (title.length < 5 || content.length < 20) {
    res.json({
      message: "title must be at 5 characters long, while content must be at least 20 characters long",
      success: false,
    })
  };

    const article = new articleModel({
     title: title,
     content: content,
     author: user.id
    });

    await article.save();

    return res.json({
       message: "Article created",
       success: true,
       article: article
    })

  } catch(error) {
    return res.json({
      success: false, 
      message: `An error occurred why creating a post: ${error.message}`,
      error: error
    })
  }
};


async function fetchArticles(req, res, next) {
  try{

    const articles = await articleModel.find().populate("author", "user_name").exec();
        return res.json({
      message: "Articles",
      count: articles.length,
      success: true,
      articles: articles
    })

  } catch(error) {
    return res.json({
      success: false, 
      message: `An error occurred why fetching all articles: ${error.message}`,
      error: error
    })
  } 
}

async function fetchArticle(req, res, next) {
  const { id } = req.params;
  try{

    const article = await articleModel.findOne({ _id: id }).populate("author", "user_name").exec();
    if (!article) {
      return res.json({
        success: false, 
        message: `Article not found`,
      })
    }

    return res.json({
      message: "Article",
      success: true,
      article: article
    })

  } catch(error) {
    return res.json({
      success: false, 
      message: `An error occurred why fetching article with id ${id}: ${error.message}`,
      error: error
    })
  } 
}

async function deleteArticle(req, res, next) {
  const { id } = req.params;
  const user = req.user;
  try{

    const article = await articleModel.findOne({ _id: id }).populate("author", "_id").exec();

    if (!article) {
      return res.json({
        success: false, 
        message: `Article not found`,
      })
    }

    const isAuthor = (user.id.toString() === article.author._id.toString()) ? true : false;

    //check access 
    if (!hasWriteAccess(user.user_type) && !isAuthor) {
      res.json({
        message: "access denied, cannot delete someone else article",
        success: false,
      })
    }

    await articleModel.deleteOne({_id: id}).exec();

    return res.json({
      message: "Article deleted",
      success: true,
      deleted: true
    })

  } catch(error) {
    return res.json({
      success: false, 
      message: `An error occurred why deleting article with id ${id}: ${error.message}`,
      error: error
    })
  } 
}

function hasWriteAccess(user_type) {
  return ["AUTHOR","GUEST_AUTHOR"].includes(user_type);
}



//function

module.exports = {
    createArticle,
    fetchArticle,
    fetchArticles,
    deleteArticle,
}