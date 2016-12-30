package com.github.sgrueter.garlic.products;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.github.sgrueter.garlic.auth.Authorized;

@Path("products")
@Produces(MediaType.APPLICATION_JSON)
@Authorized
public class ProductsResource {

	@Inject
	private ProductsService productsService;
	
	@GET
	@Path("all")
	public Response getAllProducts() {
		List<Product> allProducts = productsService.getAllProducts();
		return Response.ok(allProducts).build();
	}
}
