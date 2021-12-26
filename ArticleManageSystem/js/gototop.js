$(document).ready(function (){
    $(".goto-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 300) {
                $(".goto-top").fadeIn();
            }
            else {
                $(".goto-top").fadeOut();
            }
        });
    });
    $(".goto-top").click(function (){
        $("html, body").animate({
            scrollTop: 0
        },550);
    })
})