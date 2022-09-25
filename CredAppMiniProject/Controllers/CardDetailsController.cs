using CredAppMiniProject.Models;
using CredAppMiniProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CredAppMiniProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CardDetailsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICardDetailService _cardDetailService;
        public CardDetailsController(UserManager<ApplicationUser> userManager, ICardDetailService cardDetailService)
        {
            _userManager = userManager;
            _cardDetailService = cardDetailService;

        }

        [HttpGet]
        public async Task<IActionResult> GetCardDetails()
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                string userid = user.Id;
                return Ok(_cardDetailService.GetCardDetails(userid));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error" + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_cardDetailService.GetById(id));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error" + ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCardDetails(CardDetailModel cardDetail)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                cardDetail.UserId = user.Id;
                return Ok(_cardDetailService.AddCardDetail(cardDetail));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error" + ex.Message);
            }
        }


        [HttpPut]
        public IActionResult UpdateCardDetails(int id, CardDetailModel updateCardDetails)
        {
            try
            {
                return Ok(_cardDetailService.UpdateCardDetail(id,updateCardDetails));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error" + ex.Message);
            }
        }


        [HttpDelete]
        public IActionResult DeleteCardDetails(int id)
        {
            try
            {
                return Ok(_cardDetailService.DeleteCardDetail(id));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error" + ex.Message);
            }
        }
    }
}