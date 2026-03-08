package br.com.app.butler.entity.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tab_database_connection")
public class DatabaseConnectionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(nullable = false)
    private String dbType; // Ex: "POSTGRESQL", "MYSQL", "MONGODB"

    @Column(nullable = false)
    private String host;

    @Column(nullable = false)
    private Integer port;

    @Column(name = "db_name", nullable = false)
    private String dbName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // ESTE CAMPO DEVE SER CRIPTOGRAFADO NO BANCO!

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;
}
