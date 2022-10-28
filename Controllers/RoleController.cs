using Microsoft.AspNetCore.Mvc;
using WebApp.Context;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class RoleController : Controller
    {
        MyContext myContext;

        public RoleController(MyContext myContext)
        {
             this.myContext = myContext;
        }
        public IActionResult Index()
        {
            var data=myContext.Roles.ToList();
            return View(data);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Role role)
        {
            myContext.Roles.Add(role);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Role");
            return View();
        }


    }
}
