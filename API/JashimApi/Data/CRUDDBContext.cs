#nullable disable
using JashimApi.Models;
using Microsoft.EntityFrameworkCore;

namespace JashimApi.Data
{
    public partial class CRUDDBContext : DbContext
    {
        public CRUDDBContext()
        {
        }

        public CRUDDBContext(DbContextOptions<CRUDDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Person> People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CRUDDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__City__CountryId__267ABA7A");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Person");

                entity.Property(e => e.CityId).HasDefaultValueSql("((1))");

                entity.Property(e => e.CountryId).HasDefaultValueSql("((1))");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.LanguageSkills).HasMaxLength(1000);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ResumeFileName).HasMaxLength(100);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.CityId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Person__CityId__2E1BDC42");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.CountryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Person__CountryI__2D27B809");

                entity.HasMany(d => d.Languages)
                    .WithMany(p => p.People)
                    .UsingEntity<Dictionary<string, object>>(
                        "PersonLanguage",
                        l => l.HasOne<Language>().WithMany().HasForeignKey("LanguageId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__PersonLan__Langu__31EC6D26"),
                        r => r.HasOne<Person>().WithMany().HasForeignKey("PersonId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__PersonLan__Perso__30F848ED"),
                        j =>
                        {
                            j.HasKey("PersonId", "LanguageId").HasName("PK__PersonLa__01BC7EBFC96E42F2");

                            j.ToTable("PersonLanguage");
                        });
            });

            OnModelCreatingGeneratedProcedures(modelBuilder);
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}