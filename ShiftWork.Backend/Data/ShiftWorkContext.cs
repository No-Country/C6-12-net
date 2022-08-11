using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShiftWork.Backend.Models;

namespace ShiftWork.Backend.Data
{
    public class ShiftWorkContext : DbContext
    {
        public ShiftWorkContext (DbContextOptions<ShiftWorkContext> options)
            : base(options)
        {
        }

        public DbSet<ShiftWork.Backend.Models.Person> Person { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().ToTable("Person");
        }

    }
}
