using InventoryManagmentSystem.Data;
using InventoryManagmentSystem.Models;

namespace InventoryManagmentSystem.Repositories
{
    public class ProductRepository : IRepository<Product>
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void Add(Product entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }
            _context.Add(entity);
            _context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var productToRemove = GetById(id);
            if (productToRemove != null)
            {
                _context.Remove(productToRemove);
                _context.SaveChanges();

            }
        }

        public IEnumerable<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public Product GetById(Guid id)
        {
            return _context.Products.FirstOrDefault(s => s.ProductId == id);
        }

        public void Update(Product entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            var existingProduct = GetById(entity.ProductId);
            if (existingProduct != null)
            {
                existingProduct.ProductName = entity.ProductName;
                existingProduct.Price = entity.Price;
                existingProduct.Quantity = entity.Quantity;
                _context.Update(existingProduct);
                _context.SaveChanges();
            }
        }
    }
}
