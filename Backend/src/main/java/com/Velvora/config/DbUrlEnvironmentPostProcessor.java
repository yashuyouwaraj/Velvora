package com.Velvora.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class DbUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        try {
            String raw = environment.getProperty("DB_URL");
            if (raw == null) raw = System.getenv("DB_URL");
            if (raw == null) return;

            if (!raw.startsWith("jdbc:")) {
                // Example provider URL: mysql://user:pass@host:port/db?ssl-mode=REQUIRED
                URI uri = new URI(raw);
                String scheme = uri.getScheme();
                String userInfo = uri.getUserInfo();
                String host = uri.getHost();
                int port = uri.getPort();
                String path = uri.getPath();
                String db = (path != null && path.startsWith("/")) ? path.substring(1) : path;
                String query = uri.getQuery();

                StringBuilder jdbc = new StringBuilder();
                jdbc.append("jdbc:").append(scheme).append("://").append(host);
                if (port > 0) jdbc.append(":").append(port);
                if (db != null && !db.isEmpty()) jdbc.append("/").append(db);

                StringBuilder params = new StringBuilder();
                if (query != null && !query.isEmpty()) {
                    String[] parts = query.split("&");
                    for (String p : parts) {
                        String[] kv = p.split("=", 2);
                        String k = kv[0];
                        String v = kv.length > 1 ? kv[1] : "";
                        if ("ssl-mode".equals(k)) k = "sslMode"; // JDBC uses camelCase
                        if (params.length() > 0) params.append("&");
                        params.append(k).append("=").append(v);
                    }
                }
                if (params.length() > 0) {
                    jdbc.append("?").append(params).append("&serverTimezone=UTC");
                } else {
                    jdbc.append("?serverTimezone=UTC");
                }

                Map<String, Object> map = new HashMap<>();
                map.put("DB_URL", jdbc.toString());
                map.put("spring.datasource.url", jdbc.toString());

                if (userInfo != null) {
                    String[] ui = userInfo.split(":", 2);
                    if (ui.length > 0) map.put("DB_USERNAME", ui[0]);
                    if (ui.length > 1) map.put("DB_PASSWORD", ui[1]);
                }

                environment.getPropertySources().addFirst(new MapPropertySource("dbUrlNormalizer", map));
            }
        } catch (Exception e) {
            // don't fail startup because of URL parsing; log to stderr for visibility
            System.err.println("DbUrlEnvironmentPostProcessor: failed to normalize DB_URL: " + e.getMessage());
        }
    }
}
