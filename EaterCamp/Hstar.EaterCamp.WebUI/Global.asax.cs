using Hstar.Framework.IBatis4Net;
using Hstar.Framework.Ioc;
using System.IO;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Hstar.EaterCamp.WebUI
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            /**********系统初始化**********/
            var basePath = Server.MapPath("~/");
            //初始化Autofac容器
            AutofacHelper.InitAutofacContainer(Path.Combine(basePath, "Config/Autofac/AutofacConfig.xml"));
            //初始化iBatis.Net
            SqlMapperHelper.InitMapper();
        }
    }
}