using System.Web.Mvc;
using Hstar.Core.Ioc;
using Hstar.EaterCamp.BLL;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class UserController : BaseController
    {
        private UserBiz userBiz;

        public UserController()
        {
            userBiz = IocHelper.GetInstance<UserBiz>();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

    }
}
