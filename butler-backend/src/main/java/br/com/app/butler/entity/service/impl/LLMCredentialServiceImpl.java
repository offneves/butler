package br.com.app.butler.entity.service.impl;

import br.com.app.butler.entity.repository.LLMCredentialRepository;
import br.com.app.butler.entity.service.LLMCredentialService;
import org.springframework.stereotype.Service;


@Service
public class LLMCredentialServiceImpl implements LLMCredentialService {

    LLMCredentialRepository repository;

    public LLMCredentialServiceImpl(LLMCredentialRepository repository) {
        this.repository = repository;
    }

}
