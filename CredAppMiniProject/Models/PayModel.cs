using System.ComponentModel.DataAnnotations;

namespace CredAppMiniProject.Models
{
    public class PayModel
    {
        public int PayId { get; set; }

        [Required]
        public int AmountPaid { get; set; }

        [Required]
        public int MinDue { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string Category { get; set; }
        public int CardDetailId { get; set; }
        public int CreatedBy { get; set; }
        public string UserId { get; set; }
        public bool Status { get; set; }
    }
}
