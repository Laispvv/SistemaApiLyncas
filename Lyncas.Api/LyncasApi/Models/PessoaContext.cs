using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lyncas.Api.Models
{
    public class PessoaContext : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }
        public PessoaContext(DbContextOptions<PessoaContext> options) : base(options)
        {
        }
        
    }
}
