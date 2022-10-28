using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace WebApp.Models
{
    public class Role
    {
        public Role(int Id, string Nama)
        {
            this.Id = Id;
            this.Nama = Nama;
        }

        public Role()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Nama { get; set; }
    }
}
