using System;
using System.ComponentModel.DataAnnotations;

namespace CredAppMiniProject.Models
{
    public class CardDetailModel
    {
        public int CardDetailId { get; set; }

        [Required, StringLength(16, MinimumLength = 16, ErrorMessage = "The CardNumber must be a string with the exact length of 16.")]
        public string CardNumber { get; set; }

        [Required, MaxLength(100, ErrorMessage = "Card Owner Name Required")]
        public string CardOwnerName { get; set; }

        [Required, Range(0, 10000000, ErrorMessage = "Enter number between 0 to 10000000")]
        public int Balance { get; set; }

        [Required, MaxLength(100)]
        public string Bank { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        public int CVV { get; set; }

        public string UserId { get; set; }

        public int CreatedBy { get; set; }
    }
}
