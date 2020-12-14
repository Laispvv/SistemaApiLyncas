# API Sistema Empresa

## Como construir rotas

#### Controller:

O controller deve ter as tags `[ApiController]` e `[Route("api/[controller]")]` e herdando da classe ControllerBase, que não permite retorno de Views, ex:
```cs
[Authorize] //quando tem o token implementado
[ApiController]
[Route("api/[controller]")]
public class LivrosController : ControllerBase {...}
```
Colocar `api/Nome` do controller é uma forma de padronizar o caminho como API. O Controller deve ter acesso ao **repositório por injeção de dependência** no construtor.

#### GET:

Get deve retornar o objeto do id passado, com a rota: `NomeController/id`. A tag do GET deve ser:
```cs
[HttpGet("{id}")]
public IActionResult NomeQualquer(int id)
```

#### POST:

Post deve construir um objeto com a rota: `NomeController/`. A tag do POST deve ser:
```cs
[HttpPost]
public IActionResult NomeQualquer([FromBody]Object obj)
```

#### PUT:

Put deve atualizar os dados do objeto criado `NomeController/`. A tag do PUT deve ser:
```cs
[HttpPost]
public IActionResult NomeQualquer([FromBody]Object obj)
```

#### DELETE:

Delete deve excluir o objeto com a rota: `NomeController/id`. A tag do DELETE deve ser:
```cs
[HttpDelete("{id}")]
public IActionResult Remover(int id)
```

## Sobre APIs

- Aplicações deste tipo tem seus serviços separados, por exemplo, um projeto para cuidar da autenticação &rarr; feita com **Token**, um projeto para cuidar da parte de respostas em API, e um para cuidar da parte Web.
- Quando temos o cliente fazendo uma requisição a um tipo específico de conteúdo ao servidor e ele atendendo ou não &rarr; **Negociação de conteúdo ou Content Negotiation.**

#### Token

É criado quando o login é validado, serve como autenticação para navegar entre páginas, a aplicação checa ele a cada requisição

##### Pacotes Necessários
- `Install-Package System.IdentityModel.Tokens.Jwt`
- `Install-Package Microsoft.AspNetCore.Authentication.JwtBearer` 

##### Como configurar

A criação do Token deve seguir a seguinte estrutura:
```cs
public criaToken(LoginModel model){
        if(ModelState.IsValid){
                if(Login.Succeeded){
                        //cria o token
                        return Ok(tokenString); //200
                }
                //login não válido, não autorizado.
                return Unauthorized(); //401
        }
        //Modelo inválido, retorna erro
        return BadRequest(); //400
}
```

- O Token JWT (JSON Web Token) precisa dos seguintes itens para ser criado:
  - Direitos:
  ```cs
        var direitos = new[]
        {
                new Claim(JwtRegisteredClaimNames.Sub, model.Login),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
  ```

  - Chave:
  ```cs
        var chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("alura-webapi-authentication-valid"));
  ```
  - Credenciais:
  ```cs
        var credentials = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);   
  ```
  - Junto tudo no token:
  ```cs
        var token = new JwtSecurityToken(
                issuer: "Alura.WebApp",
                audience: "Postman",
                claims: direitos, 
                signingCredentials: credentials,
                expires: DateTime.Now.AddMinutes(30)
        );
  ```
  - E cria a string do token:
  ```cs
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
  ```

#### Converter arquivos em formatos diferentes

- Como converter o objeto em **XML**
  - Baixamos o package `Microsoft.AspNetCore.Mvc.Formatters.Xml` e adicionamos na pipeline do MVC o formatador em xml &rarr; `services.AddMvc().AddXmlSerializerFormatters();`
  - Para mandar uma requisição de converter em XML, mandamos no *postman* a requisição e no *Headers* mandamos Key &rarr; Accept, Value &rarr; application/xml
- Como converter em um **formato customizado**
  -  Criamos uma classe formatadora &rarr; *LivroCsvFormatter* que herda a classe *TextOutputFormatter*
  -  Implementa o método WriteResponseBodyAsync, que deve definir a forma como o texto será formatado, transformando em uma string
  -  Depois usar um `WriterFactory` para escrever o arquivo de resposta
        ```cs
        public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
                var livroEmCsv = "";

                if(context.Object is LivroApi)
                {
                        var livro = context.Object as LivroApi;

                        livroEmCsv = $"{livro.Titulo};{livro.Subtitulo};{livro.Autor};{livro.Lista}";
                }

                using (var escritor = context.WriterFactory(context.HttpContext.Response.Body, selectedEncoding))
                {
                        return escritor.WriteAsync(livroEmCsv);
                }
        }
        ``` 
   -  Fazer o construtor
        ```cs
        public LivroCsvFormatter()
        {
            var textcsvMediaType = MediaTypeHeaderValue.Parse("text/csv");
            var appcsvMediaType = MediaTypeHeaderValue.Parse("application/csv");
            SupportedMediaTypes.Add(textcsvMediaType);
            SupportedMediaTypes.Add(appcsvMediaType);

            SupportedEncodings.Add(Encoding.UTF8);
        }
        ```
       
