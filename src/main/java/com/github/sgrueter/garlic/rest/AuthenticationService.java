package com.github.sgrueter.garlic.rest;

public interface AuthenticationService {

	boolean authenticate(Credentials credentials);
	
}
