//Задание 1
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//Задание 2,3
import Publisher from "./models/Publisher.js";
import Magazine from "./models/Magazine.js";
import Tag from "./models/Tag.js";
import Article from "./models/Article.js";

dotenv.config();

const app=express();
app.use(express.json());
const PORT=process.env.PORT;

app.get('/', (req, res) => {
  res.send('OK: server is up');
});

const startServer =async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch(error){
        console.error('Ошибка при запуске сервера: ', error.message);
        
    }
};

startServer();

//Задание 2
app.post("/publishers", async (req, res) => {
  try {
    const pub = await Publisher.create(req.body);
    res.status(201).json(pub);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/publishers", async (_req, res) => {
  const pubs = await Publisher.find().populate("magazines");
  res.json(pubs);
});

app.post("/magazines", async (req, res) => {
  try {
    const mag = await Magazine.create(req.body);
    res.status(201).json(mag);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/magazines", async (_req, res) => {
  const mags = await Magazine.find().populate("publisher");
  res.json(mags);
});

//Задание 3

app.post("/tags", async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name });
    res.status(201).json(tag);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


app.get("/tags", async (_req, res) => {
  const tags = await Tag.find().populate("articles");
  res.json(tags);
});

app.post("/articles", async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags || []
    });

    if (article.tags?.length) {
      await Tag.updateMany(
        { _id: { $in: article.tags } },
        { $addToSet: { articles: article._id } }
      );
    }

    res.status(201).json(article);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


app.get("/articles", async (_req, res) => {
  const articles = await Article.find().populate("tags");
  res.json(articles);
});


app.patch("/articles/:articleId/tags/:tagId", async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const [updatedArticle] = await Promise.all([
      Article.findByIdAndUpdate(
        articleId,
        { $addToSet: { tags: tagId } },
        { new: true }
      ),
      Tag.findByIdAndUpdate(
        tagId,
        { $addToSet: { articles: articleId } },
        { new: true }
      )
    ]);

    res.json(await updatedArticle.populate("tags"));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


app.delete("/articles/:articleId/tags/:tagId", async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const [updatedArticle] = await Promise.all([
      Article.findByIdAndUpdate(
        articleId,
        { $pull: { tags: tagId } },
        { new: true }
      ),
      Tag.findByIdAndUpdate(
        tagId,
        { $pull: { articles: articleId } },
        { new: true }
      )
    ]);

    res.json(await updatedArticle.populate("tags"));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});