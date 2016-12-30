package com.github.sgrueter.garlic.auth;

import java.io.IOException;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Provider
@Authorized
public class JWTAuthFilter implements ContainerRequestFilter {

	@Inject
	private TokenService tokenService;
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		   String authHeaderValue = requestContext.getHeaderString("Authorization");
		   if (authHeaderValue != null && authHeaderValue.startsWith("Bearer")) {
			   String token = authHeaderValue.split(" ")[1];
			   verifyToken(token, requestContext);
		   } else {
			   abort(requestContext);
		   }
	}

	private void verifyToken(String token, ContainerRequestContext requestContext) {
		if (!tokenService.verifyToken(token)) {
			abort(requestContext);
		}
	}
	
	private void abort(ContainerRequestContext requestContext) {
		Response response = Response.status(Response.Status.UNAUTHORIZED).build();
		requestContext.abortWith(response);
	}
}
