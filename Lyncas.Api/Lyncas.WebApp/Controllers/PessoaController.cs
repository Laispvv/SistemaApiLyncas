using Lyncas.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lyncas.WebApp.Controllers
{
    public class PessoaController : Controller
    {
        private readonly PessoaApiClient _api;

        public PessoaController(PessoaApiClient api)
        {
            _api = api;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Dashboard()
        {
            var lista = await _api.GetPessoaAsync();
            ViewBag.listaPessoas = lista;
            return View();
        }

        [HttpGet]
        public IActionResult Form()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Form([FromBody] Pessoa pessoa)
        {
            if (ModelState.IsValid)
            {
                await _api.PostPessoaAsync(pessoa);
                return RedirectToAction("Pessoa", "Dashboard");
            }
            return View(pessoa);
        }

        [HttpPost]
        public async Task<IActionResult> Form([FromBody] int id)
        {
            var model = await _api.GetPessoaAsync(id);
            if (model == null)
            {
                return NotFound();
            }
            return View(model);
        }
    }
}
