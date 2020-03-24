// WORD COUNT FUNCTION FOR TEXTAREA
// WHEN DOCUMENT IS READY EXECUTE WHAT IS INSIDE
$(document).ready(function() {
  // maximum characters
  const maxWords = 140;

  // COUNT WHEN KEY IS UP IN TEST AREA
  $("textarea").on("keyup", function () {
    // Finding total chars in text box
    const allCharInBox = $(this).val().length;

    let counterLeftSpace = maxWords - allCharInBox;
    $("output").text(counterLeftSpace);

    if (maxWords < allCharInBox) {
      $("output").text(counterLeftSpace).css('color', 'red');
    }
  });
});