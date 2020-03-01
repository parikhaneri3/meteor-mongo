import { Template } from 'meteor/templating';
import { Users } from '../lib/collections.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';
import './analytics.html';
c3charts = {};

Template.body.helpers({
  users() {
    return Users.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'click .generate-btn'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Insert a task into the collection
    for (i = 0; i < 1; i++){
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
        activeIndicator: 'Y',
        effectiveDate: new Date(),
        expiryDate: ''
      });
    };
  },
  'click .reset-btn'(event) {
    Meteor.call('resetAllUsers')
  },
  'click .delete-btn'(event) {
    Meteor.call('deleteAllUsers')
  },
  'click .expire-btn'(event) {
    Meteor.call('expireAllUsers')
  },
  'click .analytics-btn'(event) {
    Router.go('/analytics');
  },
  'click .list-btn'(event) {
    Router.go('/list');
    Meteor.call('listAllUsers')
  },
});

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('users');
});
