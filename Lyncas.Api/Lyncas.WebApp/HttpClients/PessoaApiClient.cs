using Lyncas.Api.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Lyncas.WebApp
{
    public class PessoaApiClient
    {
        private readonly HttpClient _httpClient;

        public PessoaApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Pessoa>> GetPessoaAsync()
        {
            var resposta = await _httpClient.GetAsync($"pessoas");
            resposta.EnsureSuccessStatusCode();
            return await resposta.Content.ReadAsAsync<List<Pessoa>>();           
        }

        public async Task<Pessoa> GetPessoaAsync(int id)
        {
            var resposta = await _httpClient.GetAsync($"$pessoas/{id}");
            resposta.EnsureSuccessStatusCode();
            return await resposta.Content.ReadAsAsync<Pessoa>();
        }

        private HttpContent CreateMultipartFormDataContent(Pessoa pessoa)
        {
            var content = new MultipartFormDataContent();

            content.Add(new StringContent(pessoa.Nome), "\"nome\"");
            content.Add(new StringContent(pessoa.DataCriada), "\"dataCriada\"");
            content.Add(new StringContent(pessoa.Ocupacao), "\"ocupacao\"");
            content.Add(new StringContent(pessoa.Status), "\"status\"");
            //senha pode ser nula, então precisa verificar isso
            if (!string.IsNullOrEmpty(pessoa.Senha))
            {
                content.Add(new StringContent(pessoa.Senha), "\"senha\"");
            }
            var imagemContent = new StringContent(pessoa.Imagem);
            imagemContent.Headers.Add("content-type", "imagem/png");
            content.Add(
                imagemContent,
                "\"imagem\"",
                "\"imagem.png\""
                );

            if(pessoa.Id > 0)
            {
                content.Add(new StringContent(pessoa.Id.ToString()), "\"id\"");
            }

            return content;
        }

        public async Task PostPessoaAsync(Pessoa pessoa)
        {
            var content = CreateMultipartFormDataContent(pessoa);
            var resposta = await _httpClient.PutAsync("pessoas", content);
            resposta.EnsureSuccessStatusCode();
        }

    }
}