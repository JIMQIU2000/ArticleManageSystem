var currentUser;

function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

function userIsLogin()
{
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
                $(".info-popover").hide();
            } else {
                info = currentUser.UserName;
            }
            $("#username").html(info);
        },
        error: function (er) {
        }
    });
}

function getArticleList(classify) {
    var dataJson = "{'Classify' : '" + classify + "'}";
    $.ajax({
        type: "Post", //http通信传参方式
        url: "../WebService1.asmx/GetArticleListDataByClassify", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            articleList = data.d;
            var aStr = "";
            for (var i = 0; i < articleList.length; i++) {
                aStr += "<div class='article'><div class='pic'><img src='../img/FLAMING MOUNTAIN.JPG'></div><div class='title'><h2><a href='./content.html?id=" + articleList[i].ArticleID + "'>" + articleList[i].Title + "</a></h2></div><div class='create-user'><span>用户：" + articleList[i].UserName + "</span><span></span></div><div class='create-time'><span>创建时间：</span><span>" + ChangeDateFormat(articleList[i].CreateTime) + "</span></div></div>";
            }
            $(".content").html(aStr);
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
                console.log(recommendList[i].CommentCount);
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
    var classify = decodeURI(getQueryStringByName("classify"));
    getArticleList(classify);
    recommendArticle();
})