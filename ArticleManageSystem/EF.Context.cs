﻿//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ArticleManageSystem
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ArticleManageEntities : DbContext
    {
        public ArticleManageEntities()
            : base("name=ArticleManageEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Article> Article { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<UserInfo> UserInfo { get; set; }
        public DbSet<ArticleInfo> ArticleInfo { get; set; }
        public DbSet<RecommendArticle> RecommendArticle { get; set; }
        public DbSet<ManageArticleList> ManageArticleList { get; set; }
    }
}
