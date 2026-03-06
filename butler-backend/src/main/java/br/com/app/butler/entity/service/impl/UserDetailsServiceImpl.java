package br.com.app.butler.entity.service.impl;

import br.com.app.butler.entity.model.UserDetailsImpl;
import br.com.app.butler.entity.model.UserModel;
import br.com.app.butler.entity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));

        return new UserDetailsImpl(userModel);
    }
}
