package br.com.app.butler.entity.controller;

import br.com.app.butler.entity.dto.request.UserRequest;
import br.com.app.butler.entity.dto.response.PlanResponse;
import br.com.app.butler.entity.dto.response.UserResponse;
import br.com.app.butler.entity.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import br.com.app.butler.entity.dto.utils.LoginUser;
import br.com.app.butler.entity.dto.utils.RecoveryJwtToken;

@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<RecoveryJwtToken> authenticateUser(@RequestBody LoginUser loginUser) {
        return new ResponseEntity<>(userService.authenticateUser(loginUser), HttpStatus.OK);
    }

    @GetMapping("/me/{userId}")
    public ResponseEntity<UserResponse> getMe(@PathVariable Long userId) {

        UserResponse userResponse = userService.getUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);

    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {

        UserResponse userResponse = userService.createUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);

    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long userId, @Valid @RequestBody UserRequest userRequest) {

        UserResponse userResponse = userService.updateUser(userId, userRequest);
        return ResponseEntity.status(HttpStatus.OK).body(userResponse);

    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{userId}/plan")
    public ResponseEntity<PlanResponse> getUserPlan(@PathVariable Long userId) {
        PlanResponse planResponse = userService.getUserPlan(userId);
        return ResponseEntity.status(HttpStatus.OK).body(planResponse);
    }

}
