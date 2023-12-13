using InventoryManagmentSystem.Models;
using InventoryManagmentSystem.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagmentSystem.Controllers
{
    public class ProductController : Controller
    {
        private readonly IRepository<Product> _productRepository;

        public ProductController(IRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("GetProductList", Name = "GetProductList")]
        public ActionResult<IEnumerable<Product>> GetProductList()
        {
            var products = _productRepository.GetAll();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public ActionResult<Product> GetProduct(Guid id)
        {
            var product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost("AddProduct", Name = "AddProduct")]
        public IActionResult AddProduct([FromBody] Product newProduct)
        {
            if (newProduct == null)
            {
                return BadRequest("Invalid Product data");
            }

            _productRepository.Add(newProduct);
            return Ok(newProduct);
        }

        [HttpPut("{id}", Name = "UpdateProduct")]
        public IActionResult UpdateProduct(Guid id, [FromBody] Product updatedProduct)
        {
            if (updatedProduct == null || id != updatedProduct.ProductId)
            {
                return BadRequest("Invalid Product data");
            }

            var existingProduct = _productRepository.GetById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _productRepository.Update(updatedProduct);
            return Ok();
        }

        [HttpDelete("{id}", Name = "DeleteProduct")]
        public IActionResult DeleteProduct(Guid id)
        {
            var existingProduct = _productRepository.GetById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            _productRepository.Delete(id);
            return Ok();
        }
    }
}
