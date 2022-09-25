using Microsoft.EntityFrameworkCore.Migrations;

namespace CredAppMiniProject.Migrations
{
    public partial class pays : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardType",
                table: "Pay");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardType",
                table: "Pay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
