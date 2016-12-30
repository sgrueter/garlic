package com.github.sgrueter.garlic.auth;

public interface AuthenticationService {

	boolean authenticate(Credentials credentials);
	
}
