package br.com.app.butler.entity.service;

import br.com.app.butler.entity.dto.request.UserRequest;
import br.com.app.butler.entity.dto.response.UserResponse;


import br.com.app.butler.entity.dto.utils.LoginUser;
import br.com.app.butler.entity.dto.utils.RecoveryJwtToken;


public interface UserService {

    RecoveryJwtToken authenticateUser(LoginUser loginUser);

    UserResponse createUser(UserRequest userRequest);

    UserResponse getUser(Long userId);

    UserResponse updateUser(Long userId, UserRequest userRequest);

    void deleteUser(Long userId);

}
