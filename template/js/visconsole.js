/**
 * Custom console.log
 * Output all console-stuff
 * in custom div
 */
if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    if ($(".debug").length === 0) {
        $("body").append("<div class='debug'><i class='fa fa-cube'></i><div class='output'></div></div>");
    }
    $('.output').append('<p>' + message + '</p>');
};
console.error = console.debug = console.info = console.log;

// open console
$(document).ready(function(){
    $('body').on('click', '.debug', function(){
        $('.output').slideToggle();
    });
});
