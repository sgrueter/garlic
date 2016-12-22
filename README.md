# Garlic

Simple proof of concept for integrating angular frontend application into Java EE project built with maven. 

## Development Mode

For development purposes run the application on a compatible server (e.g. JBoss WildFly 10.1)
and in garlic-frontend directory start a fronend server with proxy configuration: 
`ng serve -pc proxy.conf.json`. 
 
## Final Build
To build a production war file run `mvn clean verify`.

## Important
For real projects you would have to:
* Adjust jwt.properties in src/main/resources
* Implement a proper AuthenticationService