$(document).ready(function () {
    $("#btn_regist").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var info = "{'username': '" + username + "'," + "'password': '" + password + "'}";
        $.ajax({
            type: "Post",
            url: "../WebService1.asmx/Regist",
            contentType: "application/json; charset=utf-8",
            data: info,
            dataType: "json",
            success: function (response) {
                if (response.d == "true") {
                    alert("注册成功");
                    window.location.href = "login.html";
                }
                else{
                    alert("注册失败");
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    });
});