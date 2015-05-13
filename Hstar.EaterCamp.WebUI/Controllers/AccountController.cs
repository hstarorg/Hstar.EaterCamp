using System.Diagnostics;
using System.Web.Mvc;
using Hstar.EaterCamp.BLL;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountBiz accoutBiz;

        public AccountController()
        {
            accoutBiz = new AccountBiz();
        }

        [HttpGet]
        public ActionResult Login()
        {
            string model = "error";
            if (accoutBiz.IsLogin("s", "s").Item1)
            {
                model = "succeed";
            }
            return View((object)model);
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

    }
}
