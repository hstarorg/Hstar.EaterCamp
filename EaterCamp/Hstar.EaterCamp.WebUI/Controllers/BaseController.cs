using System.Web.Mvc;

namespace Hstar.EaterCamp.WebUI.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Base/

        public ActionResult Index()
        {
            return View();
        }
    }
}