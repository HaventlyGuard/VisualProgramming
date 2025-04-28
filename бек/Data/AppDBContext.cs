using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using dz1.Model;


namespace dz1.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Comment> Comments { get; set; } //DbSet/DbSet<TEntity>: представляет набор объектов, которые хранятся в базе данных
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) //DbContext - это абстракция. Вся конфигурация хранится в DbContextOptions. Что происходит без : base(options) Если не передать options: Контекст попытается создать себя через метод OnConfiguring Но если и там нет конфигурации - выбросит исключение.
        {
           Database.EnsureCreated();
        }
    }
}
