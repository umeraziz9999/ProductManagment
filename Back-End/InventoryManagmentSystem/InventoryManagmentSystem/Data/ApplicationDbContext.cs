using InventoryManagmentSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace InventoryManagmentSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}
