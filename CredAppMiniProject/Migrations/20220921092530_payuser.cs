using Microsoft.EntityFrameworkCore.Migrations;

namespace CredAppMiniProject.Migrations
{
    public partial class payuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Pay",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pay_UserId",
                table: "Pay",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pay_AspNetUsers_UserId",
                table: "Pay",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pay_AspNetUsers_UserId",
                table: "Pay");

            migrationBuilder.DropIndex(
                name: "IX_Pay_UserId",
                table: "Pay");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Pay");
        }
    }
}
