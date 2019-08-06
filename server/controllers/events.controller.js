/**
 * @desc this controller will handle request to the events resource
 * @type {createApplication}
 * @author Zach (tsd)
 */
const EventModel = require('../models/event');


/**
 * @desc POST METHOD for 'events' - this method handles the request to create an event
 *
 */
exports.create = (req, res) => {
  console.log(req.body);

  // Fields from FE
  const title = req.body.title;
  const description = req.body.description;
  const owner = "Siraaj"; // This should come from the token or however your auth works
  const dateCreated = Date.now();
  const isPublic = true;
  const location = req.body.location;
  const uri = req.body.title.toLowerCase().split(' ').join('-');

  let event = new EventModel({
    title,
    description,
    owner,
    dateCreated,
    isPublic,
    uri,
    location
  });

  event.save()
    .then(response => {
      console.log(response);
      res.json({message: response});
    })
    .catch(err => {
      console.log(err);
      res.json({message: err});
    })
};

/** 
 * @desc GET METHOD for 'events' - displaying available public events
 */
exports.findAll = (req, res) => {
  EventModel
    .find()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Oops. This shouldn't happen"
      });
    });
};

exports.findOne = (req, res) => {
  EventModel.findOne({uri: req.params.uri})
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: "The post you are looking for does not exist!"
        })
      }
      res.send(event);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "The post you are looking for does not exist!"
          })
        }

        return res.status(500).send({
          message: "There was an issue retrieving the post."
        })
      }
    )
};

exports.update = (req, res) => {
  //Add validation for the req

  // Don't forget

  let query = {
    uri: req.params.uri
  };
  EventModel.findOneAndUpdate(query, req.body, {new: true})
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: "Could not find your event"
        });
      }
      res.send(event);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Event not found"
        })
      }

      return res.status(500).send({
        message: "Error updating the event"
      })
    });
};

exports.delete = (req, res) => {
  let query = {
    uri: req.params.uri
  };

  EventModel.findOneAndRemove(query)
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found"
        })
      }
      res.send({message: "Event deleted successfully"});
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Event not found"
        })
      }
      return res.status(500).send({
        message: "There was a problem deleting your event"
      })
    })
};
