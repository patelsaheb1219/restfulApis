const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./src/routes/crmRoutes');
const BlogSchema = require('./src/models/crmModels');
const blogModel = mongoose.model('blog', BlogSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost/test", { useUnifiedTopology: true, useNewUrlParser: true });

//POST request
app.post('/newBlog', (req, res) => {
  console.log(req.body);
  let blog = new blogModel(req.body);
  blog.save(( err, blogModel) => {
    if (err) {
      res.send(err)
    }
    res.json(blog);
  });
});

// GET request
const getAllBlogs = (req, res) => {
  blogModel.find({}, (err, blogs) => {
    if (err) {
      res.send(err);
    }
    res.json(blogs);
  })
}

app.get('/getBlogs', getAllBlogs);

// GET request by particular Id
const getBlogById = (req, res) => {
  blogModel.findById((req.params.blogId), (err, blogs) => {
    if (err) {
      res.send(err);
    }
    res.json(blogs);
  });
};

app.get('/blog/:blogId', getBlogById);

// PUT request, update by Id
const updateBlog = (req, res) => {
  blogModel.findOneAndUpdate({ _id: req.params.blogId }, req.body, { new: true, useFindAndModify: false  }, (err, updatedBlog) => {
    if (err) {
      res.send(err)
    }
    res.json(updatedBlog)
  })
}

app.put('/blog/:blogId', updateBlog);

// DELETE request 
const deleteBlog = (req, res) => {
  blogModel.remove({ _id: req.params.blogId }, (err) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: "Blog Deleted Successfully!!" });
  });
};

app.delete('/blog/:blogId', deleteBlog);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Node and Express service is running for port ${PORT}`);
});