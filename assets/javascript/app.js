var topics = ["Game Of Thrones","Reno 911","Breaking Bad","Rick and Morty","In Living Color","The Walking Dead","Martin","Westworld","The Man In The High Castle"];
//array containing show names

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


$("button").on("click", function() {
    //on-click listener for each button dynamically generated
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=eS238uhllDFcWLhClPvdxFKh0M0x8EHp&limit=10";

    $("#shows-div").empty();
    //clears div with each new click

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        // console.log(response.data[0].rating);
        var results = response.data;
        //variable containing result from api call at the key of data
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
        //iterates through results array returned from api
            var showDiv = $("<div class='show'>");
            //variable containing dynamically generated div with class of show
            var rating = results[i].rating;
            //variable assigned to rating key value from each element at index of i
            // console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            //variable assigned to dynamically generated paragraph tag containing the rating 
            showDiv.empty();
            var showImg = $("<img>");
            //variable assigned to dynamically generated image tag
            showImg.attr("src",results[i].images.fixed_height.url);
            //variable containing img tag assigned attribute of img src with gif image
            showDiv.append(p);
            //rating appended to showDiv
            showDiv.append(showImg);
            //gif from giphy api rendered to DOM on showDiv
            $("#shows-div").prepend(showDiv);
            //div containing dynamically generated elements prepended to shows-div hard-coded in HTML

        }
    });
});

