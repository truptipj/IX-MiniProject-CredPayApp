using Microsoft.EntityFrameworkCore.Migrations;

namespace CredAppMiniProject.Migrations
{
    public partial class user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CardDetails",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CardDetails_UserId",
                table: "CardDetails",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CardDetails_AspNetUsers_UserId",
                table: "CardDetails",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardDetails_AspNetUsers_UserId",
                table: "CardDetails");

            migrationBuilder.DropIndex(
                name: "IX_CardDetails_UserId",
                table: "CardDetails");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CardDetails");
        }
    }
}
