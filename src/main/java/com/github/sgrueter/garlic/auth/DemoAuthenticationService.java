package com.github.sgrueter.garlic.auth;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DemoAuthenticationService implements AuthenticationService {

	private static final String USERNAME = "foo";
	private static final String PASSWORD = "bar";

	@Override
	public boolean authenticate(Credentials credentials) {
		return USERNAME.equals(credentials.getUsername()) && PASSWORD.equals(credentials.getPassword());
	}
}
