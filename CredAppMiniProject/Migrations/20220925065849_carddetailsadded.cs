using Microsoft.EntityFrameworkCore.Migrations;

namespace CredAppMiniProject.Migrations
{
    public partial class carddetailsadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "cvv",
                table: "CardDetails",
                newName: "CVV");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CVV",
                table: "CardDetails",
                newName: "cvv");
        }
    }
}
