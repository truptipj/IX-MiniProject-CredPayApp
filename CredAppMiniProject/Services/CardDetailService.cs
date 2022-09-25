using CredAppMiniProject.DAL;
using CredAppMiniProject.Entities;
using CredAppMiniProject.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CredAppMiniProject.Services
{
    public interface ICardDetailService
    {
        IEnumerable<CardDetailModel> GetCardDetails(string userid);
        CardDetailModel GetById(int id);
        Task<CardDetailModel> AddCardDetail(CardDetailModel cardDetail);
        CardDetailModel UpdateCardDetail(int id, CardDetailModel updateCardDetails);
        CardDetailModel DeleteCardDetail(int id);
    }
    public class CardDetailService : ICardDetailService
    {
        private readonly CardDetailsDal _cardDetailsDal;

        public CardDetailService(CardDetailsDal cardDetailsDal)
        {
            _cardDetailsDal = cardDetailsDal;
        }

        public IEnumerable<CardDetailModel> GetCardDetails(string userid)
        {
            var CardDetail = _cardDetailsDal.GetCardDetails(userid).ToList();
            return (from cardDetail in CardDetail
                    select new CardDetailModel
                    {
                        CardDetailId = cardDetail.CardDetailId,
                        CardOwnerName = cardDetail.CardOwnerName,
                        CardNumber = cardDetail.CardNumber,
                        CVV = cardDetail.CVV,
                        Balance = cardDetail.Balance,
                        Bank = cardDetail.Bank,
                        ExpirationDate = cardDetail.ExpirationDate,
                    }).ToList();
        }

        public CardDetailModel GetById(int id)
        {
            var getCardById = _cardDetailsDal.GetById(id);
            if (getCardById != null)
            {
                return new CardDetailModel
                {
                    CardDetailId = getCardById.CardDetailId,
                    CardOwnerName = getCardById.CardOwnerName,
                    CardNumber = getCardById.CardNumber,
                    CVV = getCardById.CVV,
                    Balance = getCardById.Balance,
                    Bank = getCardById.Bank,
                    ExpirationDate = getCardById.ExpirationDate,
                };
            }
            else
            {
                return null;
            }
        }

        public async Task<CardDetailModel> AddCardDetail(CardDetailModel cardDetail)
        {
            var addCardDetail = new CardDetail
            {
                CardDetailId = cardDetail.CardDetailId,
                CardOwnerName = cardDetail.CardOwnerName,
                CardNumber = cardDetail.CardNumber,
                CVV = cardDetail.CVV,
                ExpirationDate = cardDetail.ExpirationDate,
                UserId = cardDetail.UserId,
                Balance = cardDetail.Balance,
                Bank = cardDetail.Bank
            };

            var addCard = await _cardDetailsDal.AddCardDetail(addCardDetail);
            return new CardDetailModel
            {
                CardDetailId = addCard.CardDetailId,
                CardOwnerName = addCard.CardOwnerName,
                CardNumber = addCard.CardNumber,
                CVV = addCard.CVV,
                Balance = addCard.Balance,
                Bank = addCard.Bank,
                ExpirationDate = addCard.ExpirationDate,
            };
        }

        public CardDetailModel DeleteCardDetail(int id)
        {
            var deleteCard = _cardDetailsDal.DeleteCardDetail(id);
            return new CardDetailModel
            {
                CardDetailId = deleteCard.CardDetailId,
                CardOwnerName = deleteCard.CardOwnerName,
                CardNumber = deleteCard.CardNumber,
                CVV = deleteCard.CVV,
                Balance = deleteCard.Balance,
                Bank = deleteCard.Bank,
                ExpirationDate = deleteCard.ExpirationDate,
            };
        }

        public CardDetailModel UpdateCardDetail(int id, CardDetailModel updateCardDetails)
        {
            var updateCard = new CardDetail
            {
                CardOwnerName = updateCardDetails.CardOwnerName,
                Balance = updateCardDetails.Balance,
                ExpirationDate = updateCardDetails.ExpirationDate
            };
            var updateData = _cardDetailsDal.UpdateCardDetail(id, updateCard);
            return new CardDetailModel
            {
                CardDetailId = updateData.CardDetailId,
                CardOwnerName = updateData.CardOwnerName,
                CardNumber = updateData.CardNumber,
                CVV = updateData.CVV,
                Balance = updateData.Balance,
                Bank = updateData.Bank,
                ExpirationDate = updateData.ExpirationDate,

            };
        }
    }
}
