using Microsoft.AspNetCore.Mvc.Rendering;
using WebApp.Models;

namespace WebApp.ViewModel
{
    public class MyViewModel
    {
        public int Id { get; set; }
        public string Nama { get; set; }
        public int DivisionID { get; set; }
        public List<SelectListItem> Divisions { get; set; }
    }
}
