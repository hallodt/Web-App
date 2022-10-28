using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class User
    {
        public User(int Id, string Password,int RoleId)
        {
            this.Id = Id;
            this.Password = Password;
            this.RoleId = RoleId;
        }
        public User()
        {

        }

        [Key]
        [ForeignKey("Employee")]
        public int Id { get; set; }
        public string Password { get; set; }
        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public Employee Employee { get; set; }
    }
}
