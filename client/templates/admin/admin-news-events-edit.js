imageIdVarEdit = new ReactiveVar(false);
attachmentIdVarEdit = new ReactiveVar(false);

Template.adminNewsEventsEdit.onRendered(function() {
  $(document).ready(function() {
    $('#description').summernote({
    	height: 200,
    	toolbar: [
    	    // [groupName, [list of button]]
	    	['style', ['style']],
	       	['font', ['bold', 'italic', 'underline', 'clear']],
	       	['fontname', ['fontname']],
	       	['color', ['color']],
	       	['para', ['ul', 'ol', 'paragraph']],
	       	['height', ['height']],
	       	['table', ['table']],
	       	['insert', ['link', 'hr']], // 'picture', is tooked out
	       	['view', ['fullscreen', 'codeview']],
	       	['help', ['help']]
		]
    });
  });

  // Get an array of the existing tags
    var tagOptions = Tags.find().fetch();

    $('#newsKeywords').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        create: true,
        highlight: true,
        maxOptions: 5,
        options: tagOptions,
        items: ["amir", "sandra"],
        onItemAdd: function (item) {
            // Check to see if tag exists in Tags collection
            // by querying the database for the tag name
            // and checking the length of the result
            var existingTag = Tags.find({"name": item}).fetch().length;
            if (!existingTag ) {
                // Add the tag to the Tags collection
                // TODO: figure out how to limit duplicate tags
                // e.g. 'Beans' and 'beans'
                // unless this is not an issue
                Tags.insert({"name": item});
            }
        }
    });

  // whole document of News & Events
  // var newsEventsEntry = NewsEvents.findOne({_id: this._id}); //, {description: "$('#description').summernote('code')"});
  // var descriptionContent = newsEventsEntry.description;
  // $('#description').summernote('code', descriptionContent);

  // console.log("db: " + newsEventsEntry);
  // console.log("description: " + descriptionContent);
});


Template.adminNewsEventsEdit.helpers({
  newsEventsEntry: function () {
    return NewsEvents.findOne({_id: this._id});
  },
  // *** manual approach to retrieve the summernote content
  // summernoteText: function() {
  // 	var newsEventsEntry = NewsEvents.find({_id: this._id}); //, {description: "$('#description').summernote('code')"});
  // 	var descriptionContent = newsEventsEntry.description;
  // 	return $('#description').summernote('code', descriptionContent);
  // 	console.log("db: " + newsEventsEntry);
  // 	console.log("description: " + descriptionContent);
  //}
});

Template.adminNewsEventsEdit.events({
	'change #coverImage': function(evt, temp) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

		var image = event.target.files[0];
		// Insert the image into the database
		// getting the image ID for use in the course object
		var imageObject = Images.insert(image);

		// The image id is stored in the image object
		var imageId = imageObject._id

		// Create a reactive var to be used when the course is added
		if (imageId) {
			imageIdVarEdit = new ReactiveVar(imageId);
		}
	},
	'change #attachment': function(evt, temp) {
    /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if (err) throw err;
      });
    }); */

		var attachment = event.target.files[0];

		// Insert the image into the database
		// getting the image ID for use in the course object
		var attachmentObject = Attachments.insert(attachment);

		// The image id is stored in the image object
		var attachmentId = attachmentObject._id

		// Create a reactive var to be used when the course is added
		if (attachmentId) {
			attachmentIdVarEdit = new ReactiveVar(attachmentId);
		}
	},
	// 'click #js-delete-image': function (evt, temo) {
	// 	evt.preventDefault();

	// 	var deleteConfirmation = confirm('Really delete this entry?');

	// 	if (deleteConfirmation) {
	// 		NewsEvents.update({_id: this._id}, {$unset: {coverImageId: ""}});
	// 		Images.remove({_id: this.coverImageId});
	// 		imageIdVarEdit.set(false);
	// 	};
	// },
	// 'click #js-delete-attachment': function (evt, temo) {
	// 	evt.preventDefault();

	// 	var deleteConfirmation = confirm('Really delete this entry?');

	// 	if (deleteConfirmation) {
	// 		NewsEvents.update({_id: this._id}, {$unset: {attachmentId: ""}});
	// 		Attachments.remove({_id: this.attachmentId});
	// 		attachmentIdVarEdit.set(false);
	// 	};
	// },
	'submit form': function (evt, temp) {
		//evt.preventDefault();

		var temp = {};
		temp.title = $('#title').val();
		temp.description = $('#description').summernote('code');
		temp.type = $('input[name=netype]:checked').val();
		// when last time modified
    temp.modifiedAt = moment().format('ddd, DD MMM YYYY hh:mm:ss');

		if (imageIdVarEdit.get()) {
			temp.coverImageId = imageIdVarEdit.get();
		}

		if (attachmentIdVarEdit.get()) {
			temp.attachmentId = attachmentIdVarEdit.get();
		}

		Meteor.call('NewsEvents.update', {_id: this._id}, {$set: temp} );
	}
});
