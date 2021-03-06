﻿using System.Web.Mvc;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "修改此模板以快速启动你的 ASP.NET MVC 应用程序。";

            return View();
        }

        /// <summary>
        /// 发起聚会
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult CreateParty()
        {
            return View();
        }
         /// <summary>
        /// 活动追踪
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult PartyShow()
        {
            return View();
        }
        /// <summary>
        /// 吃货
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Easter()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "你的应用程序说明页。";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "你的联系方式页。";

            return View();
        }
    }
}