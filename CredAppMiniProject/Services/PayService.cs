using CredAppMiniProject.DAL;
using CredAppMiniProject.Entities;
using CredAppMiniProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CredAppMiniProject.Services
{
    public interface IPayService
    {
        IEnumerable<PayModel> GetPay(string UserId);
        PayModel GetById(int Id);
        Task<PayModel> AddPay(PayModel pay);
        PayModel UpdatePay(int id, PayModel updatePay);

    }
    public class PayService : IPayService
    {
        private readonly IPay _payDal;
        public PayService(IPay payDal)
        {
            _payDal = payDal;
        }

        public async Task<PayModel> AddPay(PayModel pay)
        {
            var addPay = new Pay
            {
                ProductName = pay.ProductName,
                AmountPaid = pay.AmountPaid,
                MinDue = pay.MinDue,
                Category = pay.Category,
                Price = pay.Price,
                CardDetailId = pay.CardDetailId,
                UserId = pay.UserId,
                Status = pay.Status,
            };

            var add = await _payDal.AddPay(addPay);
            return new PayModel
            {
                ProductName = add.ProductName,
                AmountPaid = add.AmountPaid,
                MinDue = add.MinDue,
                Category = add.Category,
                CardDetailId = add.CardDetailId,
                Price = add.Price,
                UserId = add.UserId,
                Status = add.Status,
            };
        }

        public IEnumerable<PayModel> GetPay(string userId)
        {
            var paydata = _payDal.GetPay(userId);
            return (from payment in paydata
                    select new PayModel
                    {
                        PayId = payment.PayId,
                        AmountPaid = payment.AmountPaid,
                        MinDue = payment.MinDue,
                        ProductName = payment.ProductName,
                        Category = payment.Category,
                        CardDetailId = payment.CardDetailId,
                        Price = payment.Price,
                        UserId = payment.UserId,
                        Status = payment.Status,

                    }).ToList();
        }

        public PayModel GetById(int id)
        {
            var paydata = _payDal.GetById(id);
            if (paydata != null)
            {
                return new PayModel
                {
                    PayId = paydata.PayId,
                    AmountPaid = paydata.AmountPaid,
                    MinDue = paydata.MinDue,
                    ProductName = paydata.ProductName,
                    Category = paydata.Category,
                    CardDetailId = paydata.CardDetailId,
                    Price = paydata.Price,
                    UserId = paydata.UserId,
                };
            }
            else
            {
                return null;
            }
        }

        public PayModel UpdatePay(int id, PayModel updatePay)
        {
            var update = new Pay
            {
                UserId = updatePay.UserId,
                PayId = updatePay.PayId,
                AmountPaid = updatePay.AmountPaid,
                MinDue = updatePay.MinDue,
                ProductName = updatePay.ProductName,
                Category = updatePay.Category,
                CardDetailId = updatePay.CardDetailId,
                Price = updatePay.Price,
                Status = updatePay.Status,
            };
            var updateData = _payDal.UpdatePay(id, update);
            return new PayModel
            {
                PayId = updateData.PayId,
                AmountPaid = updateData.AmountPaid,
                MinDue = updateData.MinDue,
                ProductName = updateData.ProductName,
                Category = updateData.Category,
                CardDetailId = updateData.CardDetailId,
                Price = updateData.Price,
                Status = updateData.Status,
                UserId = updatePay.UserId,

            };
        }
    }
}
