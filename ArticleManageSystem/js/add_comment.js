$(document).ready(function () {
    $("#submit").click(function () {
        ArticleComment = $("#comment").val();
        UserID = currentUser.UserID;
        console.log(UserID);
        var info = "{}";
        $.ajax({
            type: "Post",
            url: "../WebService1.asmx/AddComment",
            contentType: "application/json; charset=utf-8",
            data: info,
            dataType: "json",
            success: function (response) {
                if (response.d == "true") {
                    alert("发布成功");
                    window.location.href = "content.html";
                }
                else{
                    alert("发布失败");
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    });
})