using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    public class ErrorPageController : Controller
    {
        public IActionResult Forbidden()
        {
            return View();
        }

        public IActionResult UnAuthorized()
        {
            return View();
        }
    }
}
