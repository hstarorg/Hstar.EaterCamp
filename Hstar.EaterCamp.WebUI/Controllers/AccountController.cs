using System.Web.Mvc;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

    }
}
