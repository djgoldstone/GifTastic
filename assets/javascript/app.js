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
        newButton.attr({
            "data-name": topics[i],
            "style": "margin: 2px",
        });
        //adds an attribute 
        newButton.text(topics[i]);
        //text displayed within button
        $("#buttons-div").append(newButton);
        //JQuery method appends newButton to buttons-div
    }
}


// $("button").on("click", function() {
function displayShows() {
    //on-click listener for each button dynamically generated
    var show = $(this).attr("data-name");
    //accesses data-name from show button and stores in a variable
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
            var ratingImg = $("<img>");
            if (rating === "g") {
                ratingImg.attr({
                    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TV-G_icon.svg/50px-TV-G_icon.svg.png",
                    "style": "margin: 5px",
                })
            } else if (rating === "pg") {
                ratingImg.attr({
                    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TV-PG_icon.svg/50px-TV-PG_icon.svg.png",
                    "style": "margin: 5px",
                })
            } else {
                ratingImg.attr({
                    "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/TV-14_icon.svg/50px-TV-14_icon.svg.png",
                    "style": "margin: 5px",
                })
            }
            //variable assigned to rating key value from each element at index of i
            // console.log(rating);
            
            // var p = $("<p>").text("Rating: " + rating);
            //variable assigned to dynamically generated paragraph tag containing the rating 
            showDiv.empty();
            var showImg = $("<img>");
            //variable assigned to dynamically generated image tag
            showImg.attr("src",results[i].images.fixed_height.url);
            //variable containing img tag assigned attribute of img src with gif image
            showImg.addClass("gif");
            //adds class to images
            showImg.attr({
                "data-still": results[i].images.fixed_height_still.url,
                "data-state": "animate",
                "data-animate": results[i].images.fixed_height.url,
                "style": "margin: 10px",
            });
            showDiv.append(ratingImg);
            // showDiv.append(p);
            //rating appended to showDiv
            showDiv.append(showImg);
            //gif from giphy api rendered to DOM on showDiv
            $("#shows-div").prepend(showDiv);
            //div containing dynamically generated elements prepended to shows-div hard-coded in HTML

        }
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }

            if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
};


$("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#show-input").val().trim();
    console.log(show);
    topics.push(show);
    displayButtons();
});

$(document).on("click", ".show-btn", displayShows);

displayButtons();
//calls the function and displays buttons to DOM.
