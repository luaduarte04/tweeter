// WORD COUNT FUNCTION FOR TEXTAREA
// WHEN DOCUMENT IS READY EXECUTE WHAT IS INSIDE
$(document).ready(function() {
  // maximum characters
  const maxWords = 140;

  // COUNT WHEN KEY IS UP IN TEST AREA
  $("textarea").on("keyup", function() {
    // Finding total chars in text box
    const allCharInBox = $(this).val().length;

    // Updating remaining character count
    let counterLeftSpace = maxWords - allCharInBox;
    $("output").text(counterLeftSpace);

    // if they are under 0 turn red
    if (maxWords < allCharInBox) {
      $("output").text(counterLeftSpace).css('color', 'red');
    }
  });

  // BIND PRESS ENTER EVENT TO TEXTAREA
  $('textarea').keypress(function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode === 13) {
      $(".tweet-footer button").click();
      // event.stopPropagation();
    }
  });

  // CANCEL COUNT WHEN KEY BACKSPACE IS DOWN IN TEST AREA
  $(function($) {
    let input = $('#myInput');
    input.on('keydown', function(event) {
      let key = event.keyCode || event.charCode;
      if (key === 8 || key === 46) {
        return false;
      }
    });
  });
});