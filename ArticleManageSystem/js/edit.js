var article;

//获取地址栏参数
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

function getArticleInfoByID(id) {
    var dataJson = '{"id":"' + id + '"}';
    $.ajax({
        type: "Post", //http通信传参方式
        url: "../WebService1.asmx/GetArticleInfoByIDEdit", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值 (val(article[0].Classify))
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            article = data.d;
            $("#title").html(article[0].Title);
            $("#classify").val(article[0].Classify);
            $("#content").html(article[0].ArticleContent);
        },
        error: function (err) {
            alert(err);
        }
    });
}

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
                info = currentUser.UserName;
            }
            $("#username").html(info);
        },
        error: function (er) {}
    });
}
$(document).ready(function () {
    userIsLogin();
    var id = getQueryStringByName("id");
    getArticleInfoByID(id);

    //let the value transfer through url and get the value in edit page
    $("#btn_edit").click(function () {
        var title = $("#title").val();
        var Classify = $("#classify option:selected").text();
        var content = $("#content").val();

        if (title == '') {
            alert("文章标题不能为空");
            return;
        } else if (content == '') {
            alert("文章内容不能为空");
            return;
        } else {
            var jsonData = "{'Title': '" + title + "', 'Classify':'" + Classify + "', 'ArticleContent':'" + content + "', 'ArticleID':'" + id + "'}";
            $.ajax({
                type: "Post",
                url: "../WebService1.asmx/EditPost",
                contentType: "application/json; charset=utf-8",
                data: jsonData,
                dataType: "json",
                success: function (response) {
                    if (response.d == "true") {
                        alert("修改成功");
                        window.location.href = "home.html";
                    } else {
                        alert("修改失败");
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
    });
})