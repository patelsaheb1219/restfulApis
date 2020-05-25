const routes = (app) => {

  app.route('/')
  .get((req, res) => {
    res.send(`This is the GET method`)
  })

  .post( (req, res) => {
    res.send(`This is the POST method`)
  })
  
  .put((req, res) => {
    res.send(`This is the PUT method`)
  })
  
  .delete((req, res) => {
    res.send(`This is the delete method`)
  });
}

module.exports = routes;

