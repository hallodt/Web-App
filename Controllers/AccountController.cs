using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class AccountController : Controller
    {
        MyContext myContext;

        public AccountController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        // LOGIN
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            var data = myContext.Users
                .Include(x => x.Employee)
                .Include(x => x.Role)
                .SingleOrDefault(x => x.Employee.Email.Equals(email) && x.Password.Equals(password));
            if (data != null)
            {
                ResponseLogin responseLogin = new ResponseLogin()
                {
                    FullName = data.Employee.FullName,
                    Email = data.Employee.Email,
                    Role = data.Role.Nama
                };
                return RedirectToAction("Index", "Home", responseLogin);
            }
            return View();
        }


        // Register
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(string fullName, string email, DateTime birthdate, string password)
        {
            Employee employee = new Employee()
            {
                FullName = fullName,
                Email = email,
                BirthDate = birthdate
            };
            myContext.Employees.Add(employee);
            var result = myContext.SaveChanges();
            if (result > 0)
            {
                var id = myContext.Employees.SingleOrDefault(x => x.Email.Equals(email)).Id;
                User user = new User()
                {
                    Id = id,
                    Password = password,
                    RoleId = 1
                };
                myContext.Users.Add(user);
                var resultUser=myContext.SaveChanges();
                if (resultUser > 0)
                    return RedirectToAction("Login", "Account");
            }
            return View();
        }


        // Ganti Password
        public IActionResult GantiPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GantiPassword(string email,string oldPassword, string newPassword)
        {
            return View();
        }

        //Lupa Password
        public IActionResult LupaPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult LupaPassword(string email, DateTime birthdate,string newPassword)
        {
            var data = myContext.Users
            .Include(x => x.Employee)
            .Include(x => x.Role)
            .AsNoTracking()
            .SingleOrDefault(x => x.Employee.Email.Equals(email) && x.Employee.BirthDate.Equals(birthdate));
            if (data != null)
            {
                User user = new User()
                {
                    Id = data.Id,
                    Password = newPassword,
                    RoleId = data.RoleId
                };
                myContext.Entry(user).State = EntityState.Modified;
                var resultUser = myContext.SaveChanges();
                if (resultUser > 0)
                {
                    return RedirectToAction("Login", "Account");
                }
            }
            return View();
        }
    }
}
