﻿using Microsoft.Web.WebPages.OAuth;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    //[Authorize]
    //[InitializeSimpleMembership]
    public class AccountController : BaseController
    {
        public AccountController()
        {
            
        }

        #region 登录  登出

        /// <summary>
        /// 登录页面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Task<ActionResult> Login()
        {
            return Task.Factory.StartNew(() => { }).ContinueWith<ActionResult>(x => View());
        }

        public string Login(string user)
        {
            //if (!string.IsNullOrEmpty(user.UserName) && !string.IsNullOrEmpty(user.Password))
            //{
            //    var userDbEntity = accountBll.LoginCheck(user);
            //    if (userDbEntity != null)
            //    {
            //        Session["UserInfo"] = userDbEntity;
            //        ViewBag.UserName = user.UserName;
            //        FormsAuthentication.SetAuthCookie(user.UserName, true);
            //        return "<script>window.parent.location.href='../home/index';</script>";
            //    }
            //    return "<script>alert('用户名或密码不正确!')</script>";
            //}
            return "<script>alert('用户名和密码不能为空！')</script>";
        }


        //登出
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Account", "Login");
        }

        /// <summary>
        /// 首页使用，判断登录状态，未登录，显示登录页面；已登录，显示用户信息
        /// </summary>
        /// <returns></returns>
        public ActionResult LoginOrUserInfo()
        {
            return View("PartialLogin");
        }

        #endregion 登录

        #region 帮助程序

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }

            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                OAuthWebSecurity.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // 请参见 http://go.microsoft.com/fwlink/?LinkID=177550 以查看
            // 状态代码的完整列表。
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "用户名已存在。请输入其他用户名。";

                case MembershipCreateStatus.DuplicateEmail:
                    return "该电子邮件地址的用户名已存在。请输入其他电子邮件地址。";

                case MembershipCreateStatus.InvalidPassword:
                    return "提供的密码无效。请输入有效的密码值。";

                case MembershipCreateStatus.InvalidEmail:
                    return "提供的电子邮件地址无效。请检查该值并重试。";

                case MembershipCreateStatus.InvalidAnswer:
                    return "提供的密码取回答案无效。请检查该值并重试。";

                case MembershipCreateStatus.InvalidQuestion:
                    return "提供的密码取回问题无效。请检查该值并重试。";

                case MembershipCreateStatus.InvalidUserName:
                    return "提供的用户名无效。请检查该值并重试。";

                case MembershipCreateStatus.ProviderError:
                    return "身份验证提供程序返回了错误。请验证您的输入并重试。如果问题仍然存在，请与系统管理员联系。";

                case MembershipCreateStatus.UserRejected:
                    return "已取消用户创建请求。请验证您的输入并重试。如果问题仍然存在，请与系统管理员联系。";

                default:
                    return "发生未知错误。请验证您的输入并重试。如果问题仍然存在，请与系统管理员联系。";
            }
        }

        #endregion 帮助程序
    }
}