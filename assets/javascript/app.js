var topics = ["Game Of Thrones","Reno 911","Breaking Bad","Rick and Morty","In Living Color","The Walking Dead","Martin","Westworld","The Man In The High Castle"];
//array containing show names

function displayRatings() {

};

function displayButtons() {
    $("#buttons-div").empty();
    for (var i = 0; i < topics.length; i++) {
    //for loop iterates through array of topics
        var newButton = $("<button>");
        //variable containing new button
        newButton.addClass("show-btn");
        //adds class of show-btn using JQuery method
        newButton.attr("data-name", topics[i]);
        //adds an attribute 
        newButton.text(topics[i]);
        //text displayed within button
        $("#buttons-div").append(newButton);
        //JQuery method appends newButton to buttons-div
    }
}
displayButtons();
//calls the function and displays buttons to DOM.