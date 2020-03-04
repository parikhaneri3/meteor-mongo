import { Meteor } from 'meteor/meteor';
import { Users } from '../lib/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('users', function usersPublication() {
    return Users.find();
  });

  Meteor.methods({

    insertAllUsers: function () {
      for (i = 0; i < 9999; i++) {
        Users.insert({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          title: faker.name.jobTitle(),
          product: faker.commerce.productName(),
          company: faker.company.companyName(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          activeIndicator: anyActiveIndicator(),
          effectiveDate: new Date(),
          expiryDate: ''
        });
      };
    },

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

    findAllUsers: function () {
      Users.find();
    },
  });
});

function anyActiveIndicator(){
  var randomString;
  var arr = ['Y', 'N'];
  randomString = arr[Math.floor(Math.random() * arr.length)]; 
  return randomString;
}
