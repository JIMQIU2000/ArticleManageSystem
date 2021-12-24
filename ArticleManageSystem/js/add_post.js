function userIsLogin() {
    $.ajax({
        type: "Post",
        // 方法所在页面和方法名
        url: "../WebService1.asmx/UserIsLogin",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            currentUser = data.d;
            var info;
            if (currentUser == null) {
                info = "当前未登陆！";
            } else {
                info = "欢迎 " + currentUser.UserName;
            }
            $("#username").html(info);
        },
        error: function (er) {}
    });
}

function datetime() {
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return datetime = year+"-"+month+"-"+date;
}

$(document).ready(function () {
    userIsLogin();
    $("#sumbit").click(function () {
        if (currentUser != null) {
            var UserID = currentUser.UserID;
            var Title = $("#title").val();
            var Classify = $("#classification option:selected").text();
            var CreateTime = datetime();
            var ArticleContent = $("#content").val();

            var info = "{'UserID': '" + UserID + "', 'Title' : '" + Title + "', 'Classify' : '" + Classify + "', 'CreateTime' : '" + CreateTime + "', 'ArticleContent' : '" + ArticleContent + "'}";
            $.ajax({
                type: "Post",
                url: "../WebService1.asmx/AddPost",
                contentType: "application/json; charset=utf-8",
                data: info,
                dataType: "json",
                success: function (response) {
                    if (response.d == "true") {
                        alert("发布成功");
                        window.location.href = "home.html";
                    } else {
                        alert("发布失败");
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        } else {
            alert("需要登录才可以发布文章!");
        }

    });
});