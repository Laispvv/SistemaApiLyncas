using Lyncas.Api.Models;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Lyncas.Api.Controllers
{
    public static class PessoaOrdemExtension
    {
        public static IQueryable<Pessoa> OrdenarPor(
            this IQueryable<Pessoa> query, PessoaOrdem ordem)
        {
            if(ordem.OrdenarPor != null)
            {
                query = query.OrderBy(ordem.OrdenarPor);
            }
            return query;
        }
    }
    public class PessoaOrdem
    {
        public string OrdenarPor { get; set; }
    }
}