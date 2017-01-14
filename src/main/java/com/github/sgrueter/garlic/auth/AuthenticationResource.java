package com.github.sgrueter.garlic.auth;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;

@Path("auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthenticationResource {

	@Inject
	private TokenService tokenService;
	
	@Inject
	private AuthenticationService authenticationService;
	
	@Inject
	private Logger logger;
	
	@POST
	@Path("login")
	public Response login(Credentials credentials) {
		JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
		if (authenticationService.authenticate(credentials)) {
			String token = tokenService.createToken();
			objectBuilder.add("id_token", token);
			logger.info("User {} logged in.", credentials.getUsername());
		}
		JsonObject jsonObject = objectBuilder.build();
		return Response.ok(jsonObject).build();
	}

}
