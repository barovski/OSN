//not working in production mode

// Template.body.events({
//   'click #at-facebook': function (evt, temp) {
//     Meteor.loginWithFacebook();
//     showLogin.set(false); 
//   },
//   'click #at-google': function (evt, temp) {
//     Meteor.loginWithGoogle();
//     showLogin.set(false); 
//   },
//   'click #at-linkedin': function (evt, temp) {
//     Meteor.loginWithLinkedin();
//     showLogin.set(false); 
//   },
//   'click #at-twitter': function (evt, temp) {
//     Meteor.loginWithTwitter();
//     showLogin.set(false); 
//   },
//   'submit form': function(evt, temp){
//     event.preventDefault();
    
//     var emailVar = $('#at-field-email').val(); //event.target.loginEmail.value;
//     var passwordVar = $('#at-field-password').val(); //event.target.loginPassword.value;

//     if (emailVar === "" || passwordVar === "") {
//        Bert.alert('Please enter your email and password');
//     } 

//     Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
//       if (error) { Bert.alert('Password and email do not match'); }
//     });
    
//     // Delete later: idea was to show the login-div via CSS z-index
//     // showLogin.set(false); 
//   }
// });