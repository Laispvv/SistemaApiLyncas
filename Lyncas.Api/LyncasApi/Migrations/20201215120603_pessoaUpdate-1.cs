using Microsoft.EntityFrameworkCore.Migrations;

namespace Lyncas.Api.Migrations
{
    public partial class pessoaUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DataCriada",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ocupacao",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Pessoas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataCriada",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Ocupacao",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Pessoas");
        }
    }
}
