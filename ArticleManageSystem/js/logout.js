$(document).ready(function (e) { 
    $(".logout").click(function () {
        $.ajax({
            type: "Post", //http通信传参方式
            url: "../WebService1.asmx/UserLoginOut", //服务器端资源
            contentType: "application/json; charset=utf-8", //客户端传值
            dataType: "json", //服务器传值格式
            //回调函数：
            success: function (data) {
                // alert("已经退出登录！");
                location.reload();
            },
            error: function (err) {
                alert(err);
            }
        });
    });
})