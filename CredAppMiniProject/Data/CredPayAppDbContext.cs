using CredAppMiniProject.Entities;
using CredAppMiniProject.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CredAppMiniProject.Data
{
    public class CredPayAppDbContext : IdentityDbContext<ApplicationUser>
    {
        public CredPayAppDbContext(DbContextOptions<CredPayAppDbContext> options) : base(options)
        {
        }
       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          
            modelBuilder.Entity<CardDetail>()
                .HasMany(c => c.Pay)
                .WithOne(p => p.CardDetail);
        }

        public DbSet<CardDetail> CardDetails{ get; set; }
        public DbSet<Pay> Pay { get; set; }
    }

}
