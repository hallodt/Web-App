using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using WebApp.Base;

namespace WebApp.Models
{
   public class Division : BaseModel
    {
        public Division(int Id, string Nama)
        {
            this.Id = Id;
            this.Nama = Nama;
        }

        public Division()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Nama { get; set; }
    }
}
