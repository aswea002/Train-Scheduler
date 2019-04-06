$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyA3AU82Sd4oIIzkf5twVLvDMFJv-9sLGIA",
    authDomain: "test-d54f1.firebaseapp.com",
    databaseURL: "https://test-d54f1.firebaseio.com",
    projectId: "test-d54f1",
    storageBucket: "test-d54f1.appspot.com"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding new trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    console.log("It works");

    //grab admin input

    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var time = moment(
      $("#time-input")
        .val()
        .trim(),
      "HH:mm-military time"
    ).format();
    var frequency = $("#frequency-input")
      .val()
      .trim();

    //new object for holding info

    var newTrain = {
      train: trainName,
      place: destination,
      time: time,
      min: frequency
    };
    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.place);
    console.log(newTrain.time);
    console.log(newTrain.min);

    alert("Train added successfully!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().place;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().min;

    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var newRow = $("<tr>");
    var newTrain = $("<td>").text (trainName);
    
    newRow.append(newTrain);

    var newDestination = $("<td>").text (destination);
    newRow.append(newDestination);

    var newFrequency = $("<td>").text (frequency);
    newRow.append(newFrequency);

    // needs to be calculated
    // var newTime = $("<td>").text (time);
    // newRow.append(newTime);

    // needs to be calculated
    // var newTime = $("<td>").text (time);
    // newRow.append(newTime);

$("#trains").append(newRow);
  
  
  });
});
