using Microsoft.EntityFrameworkCore.Migrations;

namespace Lyncas.Api.Migrations
{
    public partial class pessoaUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Senha",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Senha",
                table: "Pessoas");
        }
    }
}
