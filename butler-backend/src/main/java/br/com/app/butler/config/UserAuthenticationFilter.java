package br.com.app.butler.config;

import br.com.app.butler.entity.model.UserDetailsImpl;
import br.com.app.butler.entity.model.UserModel;
import br.com.app.butler.entity.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;


@Component
public class UserAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenConfig jwtTokenConfig;
    private final UserRepository userRepository;

    public UserAuthenticationFilter(JwtTokenConfig jwtTokenConfig, @Lazy UserRepository userRepository) {
        this.jwtTokenConfig = jwtTokenConfig;
        this.userRepository = userRepository;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = recoveryToken(request);
        if (token != null) {
            String subject = jwtTokenConfig.getSubjectFromToken(token);
            UserModel user = userRepository.findByEmail(subject).get();
            UserDetailsImpl userDetails = new UserDetailsImpl(user);

            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoveryToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.replace("Bearer ", "");
        }
        return null;
    }


}
