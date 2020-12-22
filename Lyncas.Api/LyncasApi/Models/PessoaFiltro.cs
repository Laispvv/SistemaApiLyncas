using Lyncas.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LyncasApi.Models
{
    public static class PessoaFiltroExtension
    {
        public static IQueryable<Pessoa> Filtrar(this IQueryable<Pessoa> query, PessoaFiltro filtro)
        {
            if(filtro != null)
            {
                if (!string.IsNullOrEmpty(filtro.Nome))
                {
                    query = query.Where(p => p.Nome.Contains(filtro.Nome));
                }
                if (!string.IsNullOrEmpty(filtro.Ocupacao))
                {
                    query = query.Where(p => p.Ocupacao.Contains(filtro.Ocupacao));
                }
                if (!string.IsNullOrEmpty(filtro.DataCriada))
                {
                    query = query.Where(p => p.DataCriada.Contains(filtro.DataCriada));
                }
                if (!string.IsNullOrEmpty(filtro.Status))
                {
                    query = query.Where(p => p.Status.Contains(filtro.Status));
                }
            }
            return query;
        }
    }
    public class PessoaFiltro
    {
        public string Nome { get; set; }
        public string Ocupacao { get; set; }
        public string DataCriada { get; set; }
        public string Status { get; set; }
    }
}
