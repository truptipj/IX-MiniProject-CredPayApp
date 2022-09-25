using CredAppMiniProject.Data;
using CredAppMiniProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CredAppMiniProject.DAL
{
    public interface IPay
    {
        IEnumerable<Pay> GetPay(string userid);
        Pay GetById(int Id);
        Task<Pay> AddPay(Pay pay);
        Pay UpdatePay(int id, Pay updatePay);
    }
    public class PayDal : IPay
    {
        private readonly CredPayAppDbContext _context;

        public PayDal(CredPayAppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Pay> GetPay(string userid)
        {
            return _context.Pay.Where(x => x.UserId == userid).ToList();
        }

        public Pay GetById(int Id)
        {
            return _context.Pay.FirstOrDefault(i => i.PayId == Id);
        }

        public async Task<Pay> AddPay(Pay pay)
        {
            var data = await _context.Pay.AddAsync(pay);
            _context.SaveChanges();
            return data.Entity;

        }

        public Pay UpdatePay(int id, Pay updatePay)
        {
            var update = _context.Pay.FirstOrDefault(a => a.PayId == id);
            if (update != null)

            {
                update.AmountPaid = updatePay.AmountPaid;
                update.MinDue = updatePay.MinDue;
                update.ProductName = updatePay.ProductName;
                update.Category = updatePay.Category;
                update.CardDetailId = updatePay.CardDetailId;
                update.Price = updatePay.Price;
                update.UserId = update.UserId;
                update.Status = updatePay.Status;
                var updatedData = _context.Pay.Update(update);
                _context.SaveChanges();
                return updatedData.Entity;
            }
            return updatePay;
        }
    }
}