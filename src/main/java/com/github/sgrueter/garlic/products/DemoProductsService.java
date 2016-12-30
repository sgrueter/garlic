package com.github.sgrueter.garlic.products;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DemoProductsService implements ProductsService {

	@Override
	public List<Product> getAllProducts() {
		return createDemoProducts();
	}

	private List<Product> createDemoProducts() {
		List<Product> products = new LinkedList<>();
		products.add(createDemoProduct("Fork", new BigDecimal("1.20"), 123456));
		products.add(createDemoProduct("Knife", new BigDecimal("2.10"), 234567));
		products.add(createDemoProduct("Spoon", new BigDecimal("1.50"), 345678));
		return products;
	}
	
	private Product createDemoProduct(String name, BigDecimal price, int quantity) {
		Product product = new Product();
		product.setName(name);
		product.setPrice(price);
		product.setQuantity(quantity);
		return product;
	}
}
