CREATE TABLE tab_tool_model
(
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT  NOT NULL,
    name         VARCHAR NOT NULL,
    description  VARCHAR NOT NULL,
    api_endpoint VARCHAR NOT NULL,
    is_global    BOOLEAN,
    agent_id     BIGINT,

    CONSTRAINT fk_tab_tool_model_user
        FOREIGN KEY (user_id)
            REFERENCES tab_user (id)

);

CREATE TABLE tab_prd
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT  NOT NULL,
    name        VARCHAR NOT NULL,
    description VARCHAR,
    content     VARCHAR NOT NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,

    CONSTRAINT fk_tab_prd_user
        FOREIGN KEY (user_id)
            REFERENCES tab_user (id)
);

CREATE TABLE tab_database_connection
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT  NOT NULL,
    db_type    VARCHAR NOT NULL,
    name       VARCHAR NOT NULL,
    host       VARCHAR NOT NULL,
    port       INTEGER NOT NULL,
    db_name    VARCHAR NOT NULL,
    username   VARCHAR NOT NULL,
    password   VARCHAR NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT fk_tab_database_connection_user
        FOREIGN KEY (user_id)
            REFERENCES tab_user (id)
);

CREATE TABLE tab_context
(
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT  NOT NULL,
    title      VARCHAR NOT NULL,
    type       VARCHAR NOT NULL,
    content    VARCHAR NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    agent_id   BIGINT,

    CONSTRAINT fk_tab_context_user
        FOREIGN KEY (user_id)
            REFERENCES tab_user (id)

);

CREATE TABLE tab_agent
(
    id                BIGSERIAL PRIMARY KEY,
    user_id           BIGINT    NOT NULL,
    llm_credential_id BIGINT    NOT NULL,
    prd_id            BIGINT    NOT NULL,
    db_connection_id  BIGINT    NOT NULL,
    name              VARCHAR   NOT NULL,
    description       VARCHAR,
    system_prompt     VARCHAR   NOT NULL,
    active            BOOLEAN,
    created_at        TIMESTAMP NOT NULL,
    updated_at        TIMESTAMP,

    CONSTRAINT fk_tab_agent_user
        FOREIGN KEY (user_id)
            REFERENCES tab_user (id),

    CONSTRAINT fk_tab_agent_llm_credential
        FOREIGN KEY (llm_credential_id)
            REFERENCES tab_llm_credential (id),

    CONSTRAINT fk_tab_agent_prd
        FOREIGN KEY (prd_id)
            REFERENCES tab_prd (id),

    CONSTRAINT fk_tab_agent_db_connection
        FOREIGN KEY (db_connection_id)
            REFERENCES tab_database_connection (id)

);

ALTER TABLE tab_context 
    ADD CONSTRAINT fk_tab_context_agent 
        FOREIGN KEY (agent_id) REFERENCES tab_agent (id);

ALTER TABLE tab_tool_model 
    ADD CONSTRAINT fk_tab_tool_agent 
        FOREIGN KEY (agent_id) REFERENCES tab_agent (id);
