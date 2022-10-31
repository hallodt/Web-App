using Microsoft.AspNetCore.Mvc.Rendering;
namespace WebApp.ViewModel
{
    public class ResponseLogin
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        //public string Password { get; set; }
    }
}
