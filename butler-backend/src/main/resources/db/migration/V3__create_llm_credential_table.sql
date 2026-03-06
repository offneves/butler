CREATE TABLE tab_llm_credential (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    provider BIGINT NOT NULL,
    label VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,

    CONSTRAINT fk_tab_llm_credential_user
       FOREIGN KEY (user_id)
       REFERENCES tab_user (id)
);
