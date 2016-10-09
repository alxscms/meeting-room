import $ from "jquery";
window.$ = $;

window.next = function () {
    const $currentEvent = $(".event:not(.event-next,.event-past)");
    const $nextEvent = $(".event-next").first();
    $currentEvent.addClass("event-past");
    $nextEvent.removeClass("event-next");
};