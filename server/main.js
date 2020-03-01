import { Meteor } from 'meteor/meteor';
import { Users } from '../lib/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('users', function usersPublication() {
    return Users.find();
  });

  Meteor.methods({
    resetAllUsers: function () {
      return Users.remove({});
    },

    deleteAllUsers: function () {
      Users.find({ activeIndicator: 'Y', expiryDate: '' }).forEach(function (doc) {
        Users.update(doc._id, {
          $set: { activeIndicator: 'N', expiryDate: new Date() },
        });
      });
    },

    expireAllUsers: function () {
      Users.find({ activeIndicator: 'Y', expiryDate: '' }).forEach(function (doc) {
        Users.update(doc._id, {
          $set: { expiryDate: new Date() },
        });
      });
    },

    listAllUsers: function () {
      Users.find({});
    },
  });
});
