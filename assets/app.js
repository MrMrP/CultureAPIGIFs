

// Here are the initial buttons Gifs will be pulled from///
var topics = ["Get At Me Bro", "Shoot Your Shot", "Winning", "For the Culture", "what"];

function createButtons() {
     $("#button-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var t = $("<button>");
        t.addClass("culture-topics");
        t.attr("topic-name", topics[i]);
        t.text(topics[i]);
        $("#button-view").append(t);
    }
}
createButtons()

// Form & Function for adding buttons based on user input
function addedCulture() {
    $("#add").on("click", function(event) {
    event.preventDefault();
    var culture = $("#input").val();
    $("#button-view").push(culture);
})}
addedCulture()

//On click of each button a list of GIFs including the Rating will be displayed in the hmtl//
$("button").on("click", function () {
    var topics = $(this).attr("topic-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=l0vXKgwN3ptyVENPDtTqpcFgT8jf374Z&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(results)


            for (var i = 0; i < results.length; i++) {
                var imageUrl = results[i].images.original_still.url;
                var image = $("<img>");
                image.attr("src", imageUrl);
                image.attr("still")
                $("#content").prepend(image);
            }
                ///Function to make still image animate and to make animated image become still
            $(image).on("click", function() {
                var state = $(this).attr("data-state");
                
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  }
                  else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "still")
                
                  }})

            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating;
                var tag = $("<p>").text("Rating: " + rating);
                $("#content").prepend(tag);
            }

        })
})