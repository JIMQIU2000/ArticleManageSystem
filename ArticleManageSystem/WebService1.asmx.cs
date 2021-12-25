using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
//using System.Web.SessionState;

namespace ArticleManageSystem
{
    /// <summary>
    /// WebService1 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
    [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {
        [WebMethod]
        public string Regist(string username, string password)
        {
            ArticleManageEntities ef = new ArticleManageEntities();

            string SQL = "INSERT INTO UserInfo " +
                            "VALUES('" + username + "','" + password + "', 'user')";

            int i = ef.Database.ExecuteSqlCommand(SQL);

            if (i == 1)
                return "true";
            else
                return "false";
        }

        [WebMethod(EnableSession = true)]
        public UserInfo UserIsValid(string username, string password)
        {
            ArticleManageEntities ef = new ArticleManageEntities();

            string SQL = "SELECT * FROM UserInfo WHERE UserName = '" + username + "'and password ='" + password + "'";

            List<UserInfo> user = ef.Database.SqlQuery<UserInfo>(SQL).ToList();

            if (user.Count == 1)
            {
                HttpContext.Current.Session["userinfo"] = user[0];
                return user[0];
            }
            else return null;
        }

        [WebMethod(EnableSession = true)]
        public UserInfo UserIsLogin()
        {
            if (HttpContext.Current.Session["userinfo"] != null)
            {
                UserInfo user = HttpContext.Current.Session["userinfo"] as UserInfo;
                return user;
            }
            else
            {
                return null;
            }
        }

        [WebMethod]
        public string AddPost(string UserID, string Title, string Classify, string CreateTime, string ArticleContent)
        {
            //string UserID = HttpContext.Current.Session["userinfo"];
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "INSERT INTO Article VALUES('" + UserID + "','" + Title + "', '" + Classify + "', '" + CreateTime + "', '" + ArticleContent + "')";
            int i = ef.Database.ExecuteSqlCommand(SQL);
            if (i == 1)
            {
                return "true";
            }
            else
                return "false";
        }

        [WebMethod]
        public string UploadImg ()
        {
            string uploadPath = "./mediaupload/";
            HttpPostedFile myFile = HttpContext.Current.Request.Files["file"];
            string fileName = myFile?.FileName ?? "";
            string fileFormat = fileName.Split('.')[fileName.Split('.').Length - 1]; // 以“.”截取，获取“.”后面的文件后缀
            string name = fileName.Split('.')[0];
            //Regex imageFormat = new Regex(@"^(sldx)|(dotx)|(docx)|(doc)|(xls)|(xlsm)|(xlsb)|(xltx)|(xlsx)|(potx)|(ppsx)|(pptx)|(txt)|(pdf)");
            //myFile.SaveAs(uploadPath);
            return "";
        }   

        [WebMethod]
        public List<Comment> CommentDisplay(string ArticleID)
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            int id = int.Parse(ArticleID);
            string SQL = "SELECT CommentID, UserID, UserName, ArticleID, CommentContent FROM Comment WHERE ArticleID = " + id;
            List<Comment> list = ef.Database.SqlQuery<Comment>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public string AddComment(string UserID, string UserName, string ArticleID, string Comment) 
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "INSERT INTO Comment VALUES('" + UserID + "', '" + UserName + "', '" + ArticleID + "', '" + Comment + "')";
            int i = ef.Database.ExecuteSqlCommand(SQL);
            if (i == 1)
            {
                return "true";
            }
            else
                return "false";
        }

        [WebMethod]
        public List<ArticleInfo> GetArticleListData()
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM ArticleInfo ORDER BY CreateTime DESC";
            List<ArticleInfo> list = ef.Database.SqlQuery<ArticleInfo>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public List<ArticleInfo> GetArticleListDataByClassify(string Classify)
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            
            string SQL = "SELECT * FROM ArticleInfo WHERE Classify='" + Classify + "'";
            List<ArticleInfo> list = ef.Database.SqlQuery<ArticleInfo>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public List<ManageArticleList> GetArticleListDataManage(string UserID)
        {
            int id = int.Parse(UserID);
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM ManageArticleList WHERE UserID=" + id;
            List<ManageArticleList> list = ef.Database.SqlQuery<ManageArticleList>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public List<RecommendArticle> GetRecommendArticles()
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM RecommendArticle";
            List<RecommendArticle> list = ef.Database.SqlQuery<RecommendArticle>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public string DeleteArticleByID(string ArticleID)
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "DELETE FROM Article WHERE ArticleID = '" + ArticleID + "'";
            int i = ef.Database.ExecuteSqlCommand(SQL);
            if (i == 1)
                return "true";
            else
                return "false";
        }

        [WebMethod]
        public List<ArticleInfo> SearchArticle(string searchContent)
        {
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM ArticleInfo WHERE Title LIKE '%"+ searchContent +"%' OR ArticleContent LIKE '%"+ searchContent +"%' OR UserName LIKE '%" + searchContent + "%'";
            
            List<ArticleInfo> list = ef.Database.SqlQuery<ArticleInfo>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public List<ManageArticleList> SearchArticleManage(string UserID, string searchContent)
        {
            int id = int.Parse(UserID);
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM ManageArticleList WHERE Title LIKE '%" + searchContent + "%' AND UserID = " + id;

            List<ManageArticleList> list = ef.Database.SqlQuery<ManageArticleList>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public string EditPost(string Title, string Classify, string ArticleContent, string ArticleID)
        {
            int id = int.Parse(ArticleID);
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "UPDATE Article SET Title = '" + Title + "', Classify = '" + Classify + "', ArticleContent = '" + ArticleContent + "' WHERE ArticleID=" + id;

            int i = ef.Database.ExecuteSqlCommand(SQL);
            return i == 1 ? "true" : "false";
        }

        [WebMethod]
        public List<ArticleInfo> GetArticleInfoByID(string id)
        {
            int ID = int.Parse(id);
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM ArticleInfo WHERE ArticleID="+ID;

            List<ArticleInfo> list = ef.Database.SqlQuery<ArticleInfo>(SQL).ToList();
            return list;
        }

        [WebMethod]
        public List<Article> GetArticleInfoByIDEdit(string id)
        {
            int ID = int.Parse(id);
            ArticleManageEntities ef = new ArticleManageEntities();
            string SQL = "SELECT * FROM Article WHERE ArticleID=" + ID;

            List<Article> list = ef.Database.SqlQuery<Article>(SQL).ToList();
            return list;
        }

    }
}
