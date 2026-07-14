package com.Velvora.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
public class DatabaseFixComponent implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        ensureUserIdAutoIncrement();
    }

    private void ensureUserIdAutoIncrement() {
        try {
            String schemaSql = "SELECT EXTRA, COLUMN_KEY FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user' AND COLUMN_NAME = 'id'";
            List<java.util.Map<String, Object>> rows = jdbcTemplate.queryForList(schemaSql);
            if (rows.isEmpty()) {
                // table or column doesn't exist yet - nothing to fix
                return;
            }
            String extra = (String) rows.get(0).get("EXTRA");
            String columnKey = (String) rows.get(0).get("COLUMN_KEY");

            boolean hasAutoInc = extra != null && extra.toLowerCase().contains("auto_increment");
            boolean hasPk = columnKey != null && columnKey.equalsIgnoreCase("PRI");

            if (!hasPk) {
                try {
                    jdbcTemplate.execute("ALTER TABLE `user` ADD PRIMARY KEY (`id`)");
                } catch (Exception e) {
                    // fail silently - adding PK may fail if column contains nulls
                }
            }

            if (!hasAutoInc) {
                try {
                    jdbcTemplate.execute("ALTER TABLE `user` MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT");
                } catch (Exception e) {
                    // if ALTER fails, log and continue - may require manual intervention
                    System.err.println("Unable to set AUTO_INCREMENT on user.id: " + e.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("DatabaseFixComponent failed: " + e.getMessage());
        }
    }
}
