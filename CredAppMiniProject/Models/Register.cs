using System.ComponentModel.DataAnnotations;

namespace CredAppMiniProject.Models
{
    public class Register
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
