using CredAppMiniProject.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CredAppMiniProject.Entities
{
    public class Pay
    {
        [Key]
        public int PayId { get; set; }

        public string ProductName { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int AmountPaid { get; set; }

        [Required]
        public int MinDue { get; set; }
        public int Price { get; set; }
        public bool Status { get; set; }

        [ForeignKey("CardDetail")]
        public int CardDetailId { get; set; }

        public CardDetail CardDetail { get; set; }

        [ForeignKey("applicationuser")]
        public string UserId { get; set; }
        public ApplicationUser applicationuser { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDateTime { get; set; }

        [Required, DefaultValue(true)]
        public bool IsActive { get; set; }
    }
}
