using System.Web.Mvc;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class HomeController : Controller
    {
       
        public HomeController()
        {
            
        }
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult About()
        {
            return View();
        }
    }
}
