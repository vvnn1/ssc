package com.github.martvey.ssc.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class JwtUtils {
    public static final long JWT_TTL = 60 * 60 * 1000L;
    public static final String JWT_KEY = "itlils";

    public static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public static String createJWT(String subject, Long ttlMillis) {
        return createJWT(subject, Collections.emptyMap(), ttlMillis);
    }

    public static String createJWT(String id, String subject, Long ttlMillis){
        return createJWT(id, subject, Collections.emptyMap(),ttlMillis);
    }

    public static String createJWT(String subject, Map<String, Object> claims, Long ttlMillis) {
        return getJwtBuilder(subject, claims, ttlMillis, getUUID())
                .compact();
    }

    public static String createJWT(String id, String subject, Map<String, Object> claims, Long ttlMillis){
        return getJwtBuilder(subject, claims,ttlMillis, id)
                .compact();
    }

    public static JwtBuilder getJwtBuilder(String subject, Map<String, Object> claims, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null){
            ttlMillis = JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)
                .setSubject(subject)
                .addClaims(claims)
                .setIssuer("ydlclaass")
                .setIssuedAt(now)
                .signWith(signatureAlgorithm, secretKey)
                .setExpiration(expDate);
    }



    public static SecretKey generalKey(){
        byte[] encodeKey = Base64.getDecoder().decode(JWT_KEY);
        return new SecretKeySpec(encodeKey, 0, encodeKey.length, "AES");
    }

    public static Claims parseJWT(String jwt){
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }

    public static Long ttl(String jwt){
        return ttl(jwt, TimeUnit.MILLISECONDS);
    }

    public static Long ttl(String jwt, TimeUnit timeUnit){
        Claims claims = parseJWT(jwt);
        long expirationMillis = claims.getExpiration().getTime();
        long currentTimeMillis = System.currentTimeMillis();
        return timeUnit.convert(expirationMillis - currentTimeMillis, TimeUnit.MILLISECONDS);
    }
}
