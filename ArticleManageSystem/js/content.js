var article;

//获取地址栏参数
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
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
                info = "当前未登录！";
                $("#currentUser").html("游客");
                $(".info-popover").hide();
            } else {
                info = currentUser.UserName;
                $("#currentUser").html(currentUser.UserName);
            }
            $("#username").html(info);
        },
        error: function (er) {}
    });
}


function getArticleInfoByID(id) {
    var dataJson = '{"id":"' + id + '"}';
    $.ajax({
        type: "Post", //http通信传参方式
        url: "../WebService1.asmx/GetArticleInfoByID", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            article = data.d;
            $("#title").html(article[0].Title);
            $("#author").html(article[0].UserName);
            $("#createtime").html(ChangeDateFormat(article[0].CreateTime));
            $("#content").html(article[0].ArticleContent);
        },
        error: function (err) {
            alert(err);
        }
    });
}

function ChangeDateFormat(cellval) {
    var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate;
}

function AddComment(id) {
    $("#submit").click(function () {
        if (currentUser == null) {
            alert("需要登录才能发表评论！");
        } else {
            var ArticleComment = $("#comment").val();
            if (ArticleComment == '') {
                alert("评论内容不能为空！");
                return;
            }else{
                var UserID = currentUser.UserID;
                var UserName = currentUser.UserName;
                var ArticleID = id;
                var info = "{'UserID' : '" + UserID + "', 'UserName': '" + UserName + "', 'ArticleID': '" + ArticleID + "', 'Comment' : '" + ArticleComment + "'}";
                $.ajax({
                    type: "Post",
                    url: "../WebService1.asmx/AddComment",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: info,
                    success: function (response) {
                        if (response.d == "true") {
                            alert("发布成功");
                            window.location.href = "content.html?id="+id;
                        } else {
                            alert("发布失败");
                        }
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
            }
        }
    });
}

function commentDisplay(id) {
    dataJson = "{'ArticleID' : '" + id + "'}";
    $.ajax({
        type: "Post",
        url: "../WebService1.asmx/CommentDisplay",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataJson,
        success: function (response) {
            commentList = response.d;
            var aStr = "";
            if(commentList.length != 0) {
                for (var i = 0; i < commentList.length; i++){
                    aStr += "<div class='comment-contianer'><div class='comment-username'><span>" + commentList[i].UserName + "</span></div><div class='comment-content'>" + commentList[i].CommentContent + "</div></div>"
                }
                $(".comment").html(aStr);
            }
            $("#commentCount").html(commentList.length+" 条评论");
        },
        error: function (err) {
            alert(err);
        }
    });
}

function recommendArticle(){
    $.ajax({
        type: "Post", //http通信传参方式
        url: "../WebService1.asmx/GetRecommendArticles", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        //回调函数：
        success: function (data) {
            recommendList = data.d;
            var aStr = "";
            for (var i = 0; i < recommendList.length; i++) {
                aStr += "<div class='topic'><div class='hashtag'></div><div class='topic_title'><a href='./content.html?id="+recommendList[i].ArticleID+"'>" + recommendList[i].Title + "</a></div><div class='comment-hit'>" + recommendList[i].CommmentCount + "条评论</div></div>";
            }
            $(".recommend-containner").html(aStr);
        },
        error: function (err) {
            alert(err);
        }
    });
}

$(document).ready(function () {
    userIsLogin();
    var id = getQueryStringByName("id");
    getArticleInfoByID(id);
    recommendArticle();
    AddComment(id);
    commentDisplay(id);
})