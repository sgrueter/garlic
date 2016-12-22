package com.github.sgrueter.garlic.rest;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.enterprise.context.ApplicationScoped;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@ApplicationScoped
public class TokenService {

	private static final String PROPERTIES = "jwt.properties";
	private static final String SECRET_PROPERTY = "secret";
	private static final String ISSUER_PROPERTY = "issuer";
	private final String secret;
	private final String issuer;
	
	public TokenService() {
		Properties properties = new Properties();
		try (InputStream input = getClass().getClassLoader().getResourceAsStream(PROPERTIES)) {
			properties.load(input);
		} catch (IOException e) {
			e.printStackTrace();
		}
		secret = properties.getProperty(SECRET_PROPERTY);
		issuer = properties.getProperty(ISSUER_PROPERTY);		
	}


	public String createToken() {
		Algorithm algorithm = createAlgorithm();
		return JWT.create().withIssuer(issuer).sign(algorithm);
	}

	public boolean verifyToken(String token) {
		Algorithm algorithm = createAlgorithm();
		JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build();
		try {
			verifier.verify(token);
			return true;
		} catch (JWTVerificationException e) {
			return false;
		}
	}
	
	private Algorithm createAlgorithm() {
		try {
			return Algorithm.HMAC256(secret);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
}
