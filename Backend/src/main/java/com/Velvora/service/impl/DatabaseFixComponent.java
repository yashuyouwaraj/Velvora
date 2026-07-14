package com.Velvora.service.impl;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

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
            // find foreign keys referencing user(id)
            String fkSql = "SELECT TABLE_NAME, CONSTRAINT_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE "
                    + "WHERE REFERENCED_TABLE_NAME = 'user' AND REFERENCED_COLUMN_NAME = 'id' AND TABLE_SCHEMA = DATABASE()";

            List<java.util.Map<String, Object>> fks = jdbcTemplate.queryForList(fkSql);

            // drop foreign keys
            for (java.util.Map<String, Object> fk : fks) {
                String table = (String) fk.get("TABLE_NAME");
                String constraint = (String) fk.get("CONSTRAINT_NAME");
                try {
                    jdbcTemplate.execute("ALTER TABLE `" + table + "` DROP FOREIGN KEY `" + constraint + "`");
                } catch (Exception e) {
                    System.err.println("Failed to drop FK " + constraint + " on " + table + ": " + e.getMessage());
                }
            }

            // ensure primary key exists
            try {
                jdbcTemplate.execute("ALTER TABLE `user` ADD PRIMARY KEY (`id`)");
            } catch (Exception ignored) {
            }

            // set AUTO_INCREMENT if not present
            try {
                jdbcTemplate.execute("ALTER TABLE `user` MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT");
            } catch (Exception e) {
                System.err.println("Unable to set AUTO_INCREMENT on user.id: " + e.getMessage());
            }

            // re-create foreign keys (simple re-add using same constraint and column names)
            for (java.util.Map<String, Object> fk : fks) {
                String table = (String) fk.get("TABLE_NAME");
                String constraint = (String) fk.get("CONSTRAINT_NAME");
                String column = (String) fk.get("COLUMN_NAME");
                try {
                    jdbcTemplate.execute("ALTER TABLE `" + table + "` ADD CONSTRAINT `" + constraint + "` FOREIGN KEY (`" + column + "`) REFERENCES `user`(`id`)");
                } catch (Exception e) {
                    System.err.println("Failed to re-create FK " + constraint + " on " + table + ": " + e.getMessage());
                }
            }
        } catch (Exception e) {
            System.err.println("DatabaseFixComponent failed: " + e.getMessage());
        }
    }
}
