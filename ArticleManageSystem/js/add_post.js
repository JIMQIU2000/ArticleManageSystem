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

// function uploadImg () {
//     var formData = new FormData();
//     formData.append('file', $('#UploadImage')[0].files[0]);
//     $.ajax({
//         type: 'Post',
//         url: '../WebService1.asmx/UploadImg',
//         data: formData,
//         success: function (status) {
//             alert("1111");
//             if (status != 'error') {
//                 var my_path = "MediaUploader/" + status;
//                 $("#myUploadedImg").attr("src", my_path);
//             }
//         },
//         processData: false,
//         contentType: false,
//         error: function () {
//             alert("Whoops something went wrong!");
//         }
//     });
// }

// function imgPreview(fileDom) {
//     //判断是否支持FileReader
//     if (window.FileReader) {
//         var reader = new FileReader();
//     } else {
//         alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
//     }

//     //获取文件
//     var file = fileDom.files[0];
//     var imageType = /^image\//;
//     //是否是图片
//     if (!imageType.test(file.type)) {
//         alert("请选择图片！");
//         return;
//     }
//     //读取完成
//     reader.onload = function (e) {
//         //获取图片dom
//         var img = document.getElementById("preview");
//         //图片路径设置为读取的图片
//         img.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
// }

$(document).ready(function () {
    userIsLogin();
    // imgPreview();
    $("#sumbit").click(function () {
        if (currentUser != null) {
            var UserID = currentUser.UserID;
            var Title = $("#title").val();
            var Classify = $("#classification option:selected").text();
            var CreateTime = datetime();
            var ArticleContent = $("#content").val();
            if(Title == ''){
                alert("文章标题不能为空");
                return;
            }else if(ArticleContent == ''){
                alert("发布内容不能为空");
                return;
            }else {
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
            } 
            // uploadImg();
        } else {
            alert("需要登录才可以发布文章!");
        }

    });
});