
using Microsoft.EntityFrameworkCore;
using Login_API.Models;

namespace Login_API.Data
{
    public class LoginContext : DbContext
    {
        public LoginContext(DbContextOptions<LoginContext> options): base (options)
        {
        }
        public DbSet<User> Usuario {get; set;}
    }
}