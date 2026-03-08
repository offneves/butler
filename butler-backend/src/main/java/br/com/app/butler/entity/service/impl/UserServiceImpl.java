package br.com.app.butler.entity.service.impl;

import br.com.app.butler.config.JwtTokenConfig;
import br.com.app.butler.entity.dto.request.UserRequest;
import br.com.app.butler.entity.dto.response.PlanResponse;
import br.com.app.butler.entity.dto.response.UserResponse;
import br.com.app.butler.entity.dto.utils.LoginUser;
import br.com.app.butler.entity.dto.utils.RecoveryJwtToken;
import br.com.app.butler.entity.enums.UserRole;
import br.com.app.butler.entity.enums.UserStatus;
import br.com.app.butler.entity.exception.EmailAlreadyInUseException;
import br.com.app.butler.entity.exception.PlanNotFoundException;
import br.com.app.butler.entity.exception.UserCannotBeNullException;
import br.com.app.butler.entity.exception.UserNotFoundException;
import br.com.app.butler.entity.mapper.PlanMapper;
import br.com.app.butler.entity.mapper.UserMapper;
import br.com.app.butler.entity.model.PlanModel;
import br.com.app.butler.entity.model.UserDetailsImpl;
import br.com.app.butler.entity.model.UserModel;
import br.com.app.butler.entity.repository.PlanRepository;
import br.com.app.butler.entity.repository.UserRepository;
import br.com.app.butler.entity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtTokenConfig jwtTokenConfig;
    private final AuthenticationManager authenticationManager;
    private final PlanMapper planMapper;

    public RecoveryJwtToken authenticateUser(LoginUser loginUser) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUser.email(), loginUser.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserModel userModel = userDetails.getUserModel();
        userModel.setLastLoginAt(LocalDateTime.now());
        userRepository.save(userModel);

        return new RecoveryJwtToken(jwtTokenConfig.generateToken(userDetails));
    }

    @Override
    public UserResponse createUser(UserRequest userRequest) {

        if (userRequest == null) {
            throw new UserCannotBeNullException("User request cannot be null.");
        }

        if (userRepository.existsByEmail(userRequest.email())) {
            throw new EmailAlreadyInUseException("E-mail already in use.");
        }

        Long planId = userRequest.planId() != null ? userRequest.planId() : 1L;
        PlanModel planModel = planRepository.findById(planId)
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        UserStatus status = userRequest.status() != null ? userRequest.status() : UserStatus.ACTIVE;
        UserRole role = userRequest.role() != null ? userRequest.role() : UserRole.CUSTOMER;

        UserModel userToSave = UserModel.builder()
                .email(userRequest.email())
                .username(userRequest.username())
                .password(passwordEncoder.encode(userRequest.password()))
                .role(role)
                .status(status)
                .plan(planModel)
                .createdAt(LocalDateTime.now())
                .lastLoginAt(LocalDateTime.now())
                .lastPasswordResetAt(LocalDateTime.now())
                .build();

        userRepository.save(userToSave);

        return userMapper.userResponse(userToSave);
    }

    @Override
    public UserResponse getUser(Long userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        return userMapper.userResponse(user);
    }

    @Override
    public UserResponse updateUser(Long userId, UserRequest userRequest) {

        if (userRequest == null) {
            throw new UserCannotBeNullException("User request cannot be null.");
        }

        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        if (!user.getEmail().equals(userRequest.email()) && userRepository.existsByEmail(userRequest.email())) {
            throw new EmailAlreadyInUseException("E-mail already in use.");
        }

        Long planId = userRequest.planId() != null ? userRequest.planId() : 1L;
        PlanModel planModel = planRepository.findById(planId)
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        user.setEmail(userRequest.email());
        user.setUsername(userRequest.username());
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        
        if (userRequest.role() != null) {
            user.setRole(userRequest.role());
        }
        
        if (userRequest.status() != null) {
            user.setStatus(userRequest.status());
        }
        
        user.setPlan(planModel);

        userRepository.save(user);

        return userMapper.userResponse(user);
    }

    @Override
    public void deleteUser(Long userId) {
        UserModel user =  userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        userRepository.delete(user);
    }

    public PlanResponse getUserPlan(Long userId) {
        Integer planId = userRepository.getPlanIdByUserId(userId);

        if (planId == null) {
            throw new PlanNotFoundException("Plan id not found.");
        }

        PlanModel planInfo = planRepository.findById(planId.longValue())
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        return planMapper.planResponse(planInfo);
    }

}
