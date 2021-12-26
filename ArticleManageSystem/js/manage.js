var currentUser;

function userIsLogin() {
    $.ajax({
        type: "Post",
        // 方法所在页面和方法名
        url: "../WebService1.asmx/UserIsLogin",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            currentUser = data.d;
            if (currentUser == null) {
                alert("需要登录才可以管理");
                window.location = "./home.html";
            } else {
                getArticleList();
            }
        },
        error: function (er) {}
    });
}

function getArticleList() {
    var dataJson = "{'UserID' : '" + currentUser.UserID + "', 'role': '" + currentUser.role + "'}";
    $.ajax({
        type: "Post", //http通信传参方式
        url: "../WebService1.asmx/GetArticleListDataManage", //服务器端资源
        contentType: "application/json; charset=utf-8", //客户端传值
        dataType: "json", //服务器传值格式
        data: dataJson,
        //回调函数：
        success: function (data) {
            articleList = data.d;
            var aStr = "";
            if (articleList.length == 0)
                return;
            else {
                for (var i = 0; i < articleList.length; i++) {
                    aStr += "<div class='article-card'><div class='article-pic'><a href=''><img src='../img/FLAMING MOUNTAIN.JPG'></a></div>";
                    aStr += "<div class='meta'><div class='article-title'><a href='./content.html?id=" + articleList[i].ArticleID + "' target='_blank'>" + articleList[i].Title + "</a></div><div class='article-time'><span>" + ChangeDateFormat(articleList[i].CreateTime) + "</span><span> 14:30:45</span></div><div class='article-comment-record'><span>" + articleList[i].CommentCount + "条评论</span></div></div>";
                    aStr += "<div class='operation'><input type='button' id='edit' value='编辑' onclick = edit(" + articleList[i].ArticleID + ")><input type='button' value='删除' onclick=del(" + articleList[i].ArticleID + ")></div></div>";
                }
                $(".articleList").html(aStr);
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}

function searchArticle(UserID) {
    $(".icon-search").click(function () {
        var searchContent = $("#searchContent").val();
        var dataJson = '{"UserID" : "' + UserID + '","searchContent" : "' + searchContent + '"}';
        $.ajax({
            type: "Post",
            url: "../WebService1.asmx/SearchArticleManage",
            contentType: "application/json; charset=utf-8",
            data: dataJson,
            dataType: "json",
            success: function (response) {
                articleList = response.d;
                var aStr = "";
                if (articleList.length == 0) {
                    aStr = "<div class='info-wrp'><img src='../img/article_empty.518ee70.png'><p>一篇文章都没有，请换个筛选条件</p></div>";
                } else {
                    for (var i = 0; i < articleList.length; i++) {
                        aStr += "<div class='article-card'><div class='article-pic'><a href=''><img src='../img/FLAMING MOUNTAIN.JPG'></a></div>";
                        aStr += "<div class='meta'><div class='article-title'><a href='./content.html?id=" + articleList[i].ArticleID + "' target='_blank'>" + articleList[i].Title + "</a></div><div class='article-time'><span>" + ChangeDateFormat(articleList[i].CreateTime) + "</span><span> 14:30:45</span></div><div class='article-comment-record'><span>5条评论</span></div></div>";
                        aStr += "<div class='operation'><input type='button' id='edit' value='编辑' onclick = edit(" + articleList[i].ArticleID + ")><input type='button' value='删除'></div></div>";
                    }
                }
                $(".articleList").html(aStr);
            },
            error: function (err) {
                alert(err);
            }
        });
    });
}

function ChangeDateFormat(cellval) {
    var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentDate;
}

function edit(ArticleID) {
    window.location = "./edit.html?id=" + ArticleID;
}

function del(ArticleID) {
    var isComfirm = confirm("确定删除该文章吗？");
    if (isComfirm == true){
        dataJson = "{'ArticleID' : '" + ArticleID + "'}";
        $.ajax({
            type: "Post",
            url: "../WebService1.asmx/DeleteArticleByID",
            contentType: "application/json; charset=utf-8",
            data: dataJson,
            dataType: "json",
            success: function (response) {
                if (response.d == "true"){
                    location.reload();
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    }
}

function create() {
    $(".btn-create").click(function (){
        window.location = "./add_post.html"
    })
}

$(document).ready(function () {
    userIsLogin();
    searchArticle(currentUser.UserID);
    create();
})