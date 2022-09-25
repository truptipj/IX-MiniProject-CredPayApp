using CredAppMiniProject.Data;
using CredAppMiniProject.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CredAppMiniProject.DAL
{
    public interface ICardDetail
    {
        IEnumerable<CardDetail> GetCardDetails(string userid);
        CardDetail GetById(int id);
        Task<CardDetail> AddCardDetail(CardDetail cardDetail);
        CardDetail UpdateCardDetail(int id, CardDetail updateCardDetails);
        CardDetail DeleteCardDetail(int id);
    }
    public class CardDetailsDal : ICardDetail
    {
        private readonly CredPayAppDbContext _context;

        public CardDetailsDal(CredPayAppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CardDetail> GetCardDetails(string userId)
        {
            return _context.CardDetails.Where(x => x.UserId == userId).ToList();
        }

        public CardDetail GetById(int id)
        {
            return _context.CardDetails.FirstOrDefault(i => i.CardDetailId == id);
        }

        public async Task<CardDetail> AddCardDetail(CardDetail cardDetail)
        {
            var data = await _context.AddAsync(cardDetail);
            _context.SaveChangesAsync();
            return data.Entity;
        }

        public CardDetail UpdateCardDetail(int id, CardDetail updateCardDetails)
        {
            var update = _context.CardDetails.FirstOrDefault(a => a.CardDetailId == id);
            if (update != null)

            {
                update.CardOwnerName = updateCardDetails.CardOwnerName;
                update.ExpirationDate = updateCardDetails.ExpirationDate;
                update.Balance = updateCardDetails.Balance;

                var updateddata = _context.CardDetails.Update(update);
                _context.SaveChanges();
                return updateddata.Entity;
            }
            return updateCardDetails;
        }

        public CardDetail DeleteCardDetail(int id)
        {
            var result = _context.CardDetails.Where(a => a.CardDetailId == id).FirstOrDefault();
            if (result != null)
            {
                _context.CardDetails.Remove(result);
                _context.SaveChanges();
                return result;
            }
            return null;
        }
    }
}
