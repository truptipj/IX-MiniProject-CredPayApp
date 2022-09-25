using CredAppMiniProject.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CredAppMiniProject.Entities
{
    public class CardDetail
    {
        [Key]
        public int CardDetailId { get; set; }

        [Required, StringLength(16, MinimumLength = 16)]
        public string CardNumber { get; set; }

        [Required, MaxLength(100)]
        public string CardOwnerName { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        public int CVV { get; set; }

        [Required, Range(0, 10000000)]
        public int Balance { get; set; }

        [Required, MaxLength(100)]
        public string Bank { get; set; }

        //foreign key

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<Pay> Pay { get; set; }

        //Audit
        public int CreatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDateTime { get; set; }

        [Required, DefaultValue(true)]
        public bool IsActive { get; set; }
    }
}
