const systemLogger = require ('../config/log4js-config');
const Const = require ('../config/const');
const mongoose = require('mongoose');
const Projects = require('./../model/projects');
const Categories = require('./../model/categories');

module.exports = {
  getProjectDList: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    
    Projects.find({del_flg: 0}, (err, ret) => {
      if (err) console.error(err);
      console.log(ret);
      mongoose.disconnect();
      return res.send(ret);
    });
  },
  
  getProjectData: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    Categories
    .find({ projects: req.body.projectId })
    .populate('projects')
    .exec(function (err, ret) {
      if (err) return handleError(err);
      console.log(ret);
    });

    // const Schema = mongoose.Schema;

    // const personSchema = Schema({
    //   _id: Schema.Types.ObjectId,
    //   name: String,
    //   age: Number,
    //   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    // });
    
    // const storySchema = Schema({
    //   author: { type: Schema.Types.ObjectId, ref: 'Person' },
    //   title: String
    // });
    
    // const Story = mongoose.model('Story', storySchema);
    // const Person = mongoose.model('Person', personSchema);

    // const author = new Person({
    //   _id: new mongoose.Types.ObjectId(),
    //   name: 'Ian Fleming',
    //   age: 50
    // });
    
    // author.save(function (err) {
    //   if (err) return handleError(err);
    
    //   const story1 = new Story({
    //     title: 'Casino Royale',
    //     author: author._id    // assign the _id from the person
    //   });
    
    //   story1.save(function (err) {
    //     if (err) return handleError(err);
    //     // that's it!
    //   });
    // });

  // Story.
  // findOne({ title: 'Casino Royale' }).
  // populate('author').
  // exec(function (err, story) {
  //   if (err) return handleError(err);
  //   console.log('The author is %s', story.author.name);
  //   // prints "The author is Ian Fleming"
  // });

  },

  saveProjectAndCategory: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const projects = new Projects({
      _id: new mongoose.Types.ObjectId(),
      project_id: 2,
      project_name: 'Alan Smith',
      del_flg: 0,
    });
    
    projects.save(function (err) {
      if (err) console.log(err);
    
      const categories1 = new Categories({
        projects: projects._id,
        category_id: 2,
        category_name: 'Alan Royale',
        del_flg: 0
      });
    
      categories1.save(function (err, ret) {
        if (err) console.log(err);
        return res.send(ret);
      });
    });
  },

  saveCategory: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const categories = new Categories({
      projects: '600b94d3ab53021f74fdbaee',
      category_id: 3,
      category_name: 'Alan Alan Alan',
      del_flg: 0
    });
    
    categories.save(function (err, ret) {
      if (err) console.log(err);
      return res.send(ret);
    });
  },

  addProject: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const projecstSave = new Projects({ project_name: req.body.addProjectName, del_flg: 0 });
    projecstSave.save((err, ret) => {
      if (err) console.error(err)
      console.log(ret)
      mongoose.disconnect();
      return res.send(ret);
    });
  }
};
