using Lyncas.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Lyncas.Api.Controllers
{
    public static class PessoaPaginadaExtensions
    {
        public static PessoaPaginada ToPessoaPaginada(
            this IQueryable<Pessoa> query, PessoaPaginacao paginacao)
        {
            int totalItens = query.Count();
            int totalPaginas = (int)Math.Ceiling(totalItens / (double)paginacao.Tamanho);
            return new PessoaPaginada
            {
                Total = totalItens,
                TotalPagina = totalPaginas,
                NumeroPagina = paginacao.Pagina,
                TamanhoPagina = paginacao.Tamanho,
                Resultado = query
                    .Skip(paginacao.Tamanho * (paginacao.Pagina - 1))
                    .Take(paginacao.Tamanho).ToList(),
                Anterior = (paginacao.Pagina > 1) ?
                    $"livros?tamanho={paginacao.Pagina-1}&pagina={paginacao.Tamanho}" : "",
                Proximo = (paginacao.Pagina < totalPaginas) ?
                    $"livros?tamanho={paginacao.Pagina + 1}&pagina={paginacao.Tamanho}" : "",
            };
        }
    }
    public class PessoaPaginada
    {
        public int Total { get; set; }
        public int TotalPagina { get; set; }
        public int TamanhoPagina { get; set; }
        public int NumeroPagina { get; set; }
        public IList<Pessoa> Resultado { get; set; }
        public string Anterior { get; set; }
        public string Proximo { get; set; }
    }
    public class PessoaPaginacao
    {
        public int Pagina { get; set; } = 1;
        //inicia por padrão o tamanho da página como 6
        public int Tamanho { get; set; } = 6;
    }
}