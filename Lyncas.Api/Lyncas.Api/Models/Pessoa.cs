﻿using System;
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
    }
}
