using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApp.ViewModel
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }

        public List<SelectListItem> Roles { get; set; }

    }
}
