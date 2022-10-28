using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class DepartementController : Controller
    {
        MyContext myContext;
        public DepartementController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        // GET ALL
        public IActionResult Index()
        {
            var data = myContext.Departements.ToList();
            return View(data);
        }

        // GET BY ID
        public IActionResult Details(int id)
        {
            var data = myContext.Departements.Find(id);
            return View(data);
        }

        // INSERT - GET POST
        public IActionResult Create()
        {
            var vm = new MyViewModel();
            vm.Divisions = myContext.Divisions.Select(a => new SelectListItem()
            {
                Value=a.Id.ToString(),
                Text = a.Nama
            }).ToList();
            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Departement departement)
        {
            myContext.Departements.Add(departement);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Departement");
            return View();
        }

        // UPDATE - GET POST
        public IActionResult Edit(int id)
        {
            var data = myContext.Departements.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Departement departement)
        {
            var data = myContext.Departements.Find(id);
            if (data != null)
            {
                data.Nama = departement.Nama;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Departement");
            }
            return View();
        }

        // DELETE - GET POST
        public IActionResult Delete(int id)
        {
            var data = myContext.Departements.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Departement departement)
        {
            myContext.Departements.Remove(departement);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Departement");
            return View();
        }
    }
}
