import { Template } from 'meteor/templating';
import { Users } from '../lib/collections.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import '../build/jquery-3.3.1.js';
import '../build/jquery.dataTables.min.js'
dataTablesBootstrap(window, $);

import './main.html';

Template.body.helpers({
  users() {
    return Users.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'click .generate-btn'(event) {
    event.preventDefault();
    Meteor.call('insertAllUsers')
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
  },
});

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('users');
});

Router.configure({
  noRoutesTemplate: 'noRoutesTemplate',
});

Template.pieDemo.rendered = function () {
  var data = new Array();
  $('#container-pie').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      name: 'Anteil',
      data: [{
        name: 'ActiveIndicator-Y',
        y: 61.41,
        sliced: true,
        selected: true,
        color: '#55BF3B'
      }, {
        name: 'ActiveIndicator-N',
        y: 11.84,
        color: '#000000'
      }]
    }]
  });
}

Template.userList.rendered = function () {
  $('#example').DataTable();
}