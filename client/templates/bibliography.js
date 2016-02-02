Session.setDefault("yearSorter", -1);
Session.setDefault("abcSorter", false);

Tracker.autorun(function () {
          console.log("The abcSorter is: " +
            Session.get("abcSorter")
          );
});

Tracker.autorun(function () {
          console.log("The yearSorter is: " +
            Session.get("yearSorter")
          );
});

Template.bibliography.helpers({
  atts: function() {
    return {placeholder: "Search for authors, title, abstract here ..."};
  },
  publicationsIndex: function() {
    return PublicationsIndex;
  },
  publicationData: function () {
    if (Session.get("yearSorter")) {
      return Publications.find({}, {
      sort: {year: Session.get("yearSorter")}
    }).fetch();
  
    } else {
      return Publications.find({}, {
      sort: {"authors.0.lastName": Session.get("abcSorter")}
    }).fetch();
    }
      
  }
});

// Template.bibliography.events({
//   'click .fa-sort-asc': function (evt,temp) {
//     evt.preventDefault();
//     $('.fa-sort-asc').removeAttr("class id");
//     $('#yearIcon').addClass("fa fa-sort-desc");
//     Session.set("yearSorter", 1);
//     //Session.set("yearSorter", 1);
//   },
//   'click .fa-sort-desc': function (evt,temp) {
//     evt.preventDefault();
//     $('.fa-sort-desc').removeAttr("class id");
//     $('#yearIcon').addClass("fa fa-sort-asc");
//     Session.set("yearSorter", -1);
//   },
//   'click .fa-sort-alpha-asc': function (evt,temp) {
//     evt.preventDefault();
//     $('.fa-sort-alpha-asc').removeAttr("class id");
//     $('#abcIcon').addClass("fa fa-sort-alpha-desc");
//     Session.set("abcSorter", 1);
//   },
//   'click .fa-sort-alpha-desc': function (evt,temp) {
//     evt.preventDefault();
//     $('.fa-sort-alpha-desc').removeAttr("class id");
//     $('#abcIcon').addClass("fa fa-sort-alpha-asc");
//     Session.set("abcSorter", -1);
//   }
//});

Template.bibliography.events({
  'click #yearIcon': function (evt,temp) {
    evt.preventDefault();
    if ($('#yearIcon').hasClass('fa-sort-asc')) 
    { 
      $('.fa-sort-asc').removeClass('fa-sort-asc');
      $('#yearIcon').addClass("fa fa-sort-desc");
      Session.set("yearSorter", -1);
      Session.set("abcSorter", false);
    } 
    else 
    {
      $('#yearIcon').removeClass("fa fa-sort-desc");
      $('#yearIcon').addClass("fa fa-sort-asc");
      Session.set("yearSorter", 1);
      Session.set("abcSorter", false);
    }
  },
  'click #abcIcon': function (evt,temp) {
    evt.preventDefault();
    if ($('#abcIcon').hasClass('fa-sort-alpha-asc')) 
    { 
      $('.fa-sort-alpha-asc').removeClass('fa-sort-alpha-asc');
      $('#abcIcon').addClass("fa fa-sort-alpha-desc");
      Session.set("abcSorter", -1);
      Session.set("yearSorter", false);
    } 
    else 
    {
      $('#abcIcon').removeClass("fa fa-sort-alpha-desc");
      $('#abcIcon').addClass("fa fa-sort-alpha-asc");
      Session.set("abcSorter", 1);
      Session.set("yearSorter", false);
    }
  }
});