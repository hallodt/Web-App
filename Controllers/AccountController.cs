using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Handler;
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
                .SingleOrDefault(x => x.Employee.Email.Equals(email));
            var validate = Hashing.ValidatePass(password, data.Password);
            if (data != null && validate == true)
            {
                HttpContext.Session.SetInt32("Id", data.Id);
                HttpContext.Session.SetString("FullName", data.Employee.FullName);
                HttpContext.Session.SetString("Email", data.Employee.Email);
                HttpContext.Session.SetString("Role", data.Role.Nama);
                
                
                return RedirectToAction("Index", "Home");
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
            //var data = myContext.Users
            //.Include(x => x.Employee)
            //.Include(x => x.Role)
            //.SingleOrDefault(x => x.Employee.Email.Equals(email));
            if (myContext.Employees.Any(x => x.Email.Equals(email)))
            {
                return View();
            }
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
                    Password =Hashing.HashPass(password),
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
        public IActionResult GantiPassword(string email, string oldPassword, string newPassword)
        {
            var data = myContext.Users
                .Include(x => x.Employee)
                .Include(x => x.Role)
                .SingleOrDefault(x => x.Employee.Email.Equals(email));
            var validate = Hashing.ValidatePass(oldPassword, data.Password);
            if (data != null && validate)
            {
                data.Password = Hashing.HashPass(newPassword);
                myContext.Entry(data).State = EntityState.Modified;
                var resultUser = myContext.SaveChanges();
                if (resultUser > 0)
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            return View();
        }

        //Lupa Password
        public IActionResult LupaPassword()
        {
            return View();
        }

        [HttpPost]
        public IActionResult LupaPassword(string email, DateTime birthdate,string newPassword,User user)
        {
            var data = myContext.Users
            .Include(x => x.Employee)
            .SingleOrDefault(x => x.Employee.Email.Equals(email) && x.Employee.BirthDate.Equals(birthdate));
            //var validate = Hashing.ValidatePass(data.Password, user.Password);
            if (data != null)
            {
                data.Password = Hashing.HashPass(newPassword);
                myContext.Entry(data).State = EntityState.Modified;
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
