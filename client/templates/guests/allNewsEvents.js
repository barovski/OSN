Session.setDefault('newsEventsViewMain', [ "news", "event" ]);

Template.allNewsEvents.helpers({
  newsEventsData: function () {
    return NewsEvents.find({type: { $in: Session.get('newsEventsViewMain')}}, {sort: {createdAt: -1}, limit: 3});
  },
  imageExists: function () {
    return NewsEvents.find({}, {coverImageId: { $exists: true } });
  }
});

Template.allNewsEvents.events({
  'click #js-seeAllMain': function (evt, tpl) {
    //Session.set('newsEventsView', '$or: [ { type: "news" }, { type: "event" } ]');
    Session.set('newsEventsViewMain', [ "news", "event" ]);
    $('#js-seeAllMain').addClass("active");
    $('#js-seeNewsMain').removeClass("active");
    $('#js-seeEventsMain').removeClass("active");
  },
  'click #js-seeNewsMain': function (evt, tpl) {
    //Session.set('newsEventsView', 'type: "news"');
    Session.set('newsEventsViewMain', ['news']);
    $('#js-seeNewsMain').addClass("active");
    $('#js-seeAllMain').removeClass("active");
    $('#js-seeEventsMain').removeClass("active");
  },
  'click #js-seeEventsMain': function (evt, tpl) {
    //Session.set('newsEventsView', 'type: "event"');
    Session.set('newsEventsViewMain', ['event']);
    $('#js-seeEventsMain').addClass("active");
    $('#js-seeAllMain').removeClass("active");
    $('#js-seeNewsMain').removeClass("active");
  }
});