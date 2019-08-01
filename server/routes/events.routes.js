module.exports = (app) => {
  const events = require('../controllers/events.controller');

  // Create a new Post
  // For Authentication purposes, integrate with your auth
  // app.post('/posts', users.isAuthenticated)
  app.post('/events', events.create);

  // Retrieve all Posts
  app.get('/events', events.findAll);

  // Retrieve a single Post with post uri
  app.get('/events/:uri', events.findOne);

  // Update a Post
  app.put('/events/:uri', events.update);

  // Delete a Post with uri
  app.delete('/events/:uri', events.delete);
};
