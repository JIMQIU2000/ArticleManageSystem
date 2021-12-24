$(document).ready(function () {
    var evt = window.event || e;
    if(evt.keyCode == 13){
        $("#btn_login").click();
    }
    $("#btn_login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == "" || password == "")
        {
            alert("用户或密码不能为空");
            return;
        }

        var info = "{'username': '" + username + "'," + "'password': '" + password + "'}";
        $.ajax({
            type: "Post",
            url: "../WebService1.asmx/UserIsValid",
            contentType: "application/json; charset=utf-8",
            data: info,
            dataType: "json",
            success: function (response) {
                user = response.d;
                if (user == null)
                    alert("用户名或密码错误");
                else if(username == user.UserName && password == user.Password)
                    window.location = "home.html";
            },
            error: function (err) {
                alert(err);
            }
        });
    });
});