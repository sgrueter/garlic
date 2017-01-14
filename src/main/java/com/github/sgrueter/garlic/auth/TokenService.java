package com.github.sgrueter.garlic.auth;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Properties;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.slf4j.Logger;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

@ApplicationScoped
public class TokenService {

	private static final String PROPERTIES = "jwt.properties";
	private static final String SECRET_PROPERTY = "secret";
	private static final String ISSUER_PROPERTY = "issuer";
	private static final String VALIDITY_PROPERTY = "validity";
	private Algorithm algorithm;
	private String issuer;
	private JWTVerifier verifier;
	private long validityInSeconds;
	
	@Inject
	private Logger logger;
	
	public TokenService() {
		Properties properties = new Properties();
		try (InputStream input = getClass().getClassLoader().getResourceAsStream(PROPERTIES)) {
			properties.load(input);
			String secret = properties.getProperty(SECRET_PROPERTY);
			algorithm = Algorithm.HMAC256(secret);
			issuer = properties.getProperty(ISSUER_PROPERTY);
			verifier = JWT.require(algorithm).withIssuer(issuer).build();
			validityInSeconds = Long.parseLong(properties.getProperty(VALIDITY_PROPERTY));
		} catch (Exception e) {
			logger.error("Initialization failed", e);
		}
	}


	public String createToken() {
		ZoneOffset zone = ZoneOffset.UTC;
		LocalDateTime startTime = LocalDateTime.now(zone);
		LocalDateTime endTime = startTime.plusSeconds(validityInSeconds);
		Date issuedAt = Date.from(startTime.toInstant(zone));
		Date expiresAt = Date.from(endTime.toInstant(zone));
		return JWT.create()
				.withIssuer(issuer)
				.withIssuedAt(issuedAt)
				.withExpiresAt(expiresAt)
				.sign(algorithm);
	}

	public boolean verifyToken(String token) {
		try {
			verifier.verify(token);
			return true;
		} catch (JWTVerificationException e) {
			return false;
		}
	}
	
}
