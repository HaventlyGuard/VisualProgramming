using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using dz1.Model;

namespace dz1.Data
{
    public class LogDBConext
    {
        public class LoggingDbContext : DbContext
        {
            public DbSet<LoggingEntry> Logs { get; set; }
            public LoggingDbContext(DbContextOptions<LoggingDbContext> options) : base(options) { Database.EnsureCreated(); }
           
        }
    }
}
