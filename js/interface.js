// Home page container height
$(function(){
  $('.tips, .example').css({ height: $(window).innerHeight() });
  $(window).resize(function(){
    $('.tips, .example').css({ height: $(window).innerHeight() });
  });
});
