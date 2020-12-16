using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Lyncas.Api.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string DataCriada { get; set; }
        [Required]
        public string Ocupacao { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Imagem { get; set; }
        public string Senha { get; set; }

        public string GetColorStatusCode()
        {
            if (Status == "Disponível") return "#6ed659";
            else if (Status == "Ausente") return "#d6d459";
            else return "#dd405a";
        }
    }
}
