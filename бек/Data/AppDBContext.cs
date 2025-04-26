using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using dz1.Model;


namespace dz1.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) 
        {
           Database.EnsureCreated();

        }

     



    }
}
