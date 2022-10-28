using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Context;

namespace WebApp.Models
{
    public class Departement
    {
        public Departement(int Id, string Nama, int DivisionID)
        {
            this.Id = Id;
            this.Nama = Nama;
            this.DivisionID = DivisionID;
        }

        public Departement()
        {

        }

        [Key]
        public int Id { get; set; }
        public string Nama { get; set; }

        [ForeignKey("Division")]
        public int DivisionID { get; set; }
        public virtual Division Division { get; set; }
    }
}
