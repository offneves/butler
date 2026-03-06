package br.com.app.butler.entity.controller;

import br.com.app.butler.entity.dto.request.PlanRequest;
import br.com.app.butler.entity.dto.response.PlanResponse;
import br.com.app.butler.entity.service.PlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping()
    public ResponseEntity<List<PlanResponse>> getAllPlans() {
        return new ResponseEntity<>(planService.getAllPlans(), HttpStatus.OK);
    }

    @GetMapping("/{planId}")
    public ResponseEntity<PlanResponse> getPlanById(@PathVariable Long planId) {

        PlanResponse planToGet = planService.getPlanById(planId);
        return ResponseEntity.status(HttpStatus.OK).body(planToGet);

    }

    @PostMapping
    public ResponseEntity<PlanResponse> createPlan(@Valid @RequestBody PlanRequest planRequest) {

        PlanResponse planToCreate = planService.createPlan(planRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(planToCreate);

    }

    @PutMapping("/{planId}")
    public ResponseEntity<PlanResponse> updatePlan(@PathVariable Long planId, @Valid @RequestBody PlanRequest planRequest) {

        PlanResponse planToUpdate = planService.updatePlan(planId, planRequest);
        return ResponseEntity.status(HttpStatus.OK).body(planToUpdate);

    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long planId) {

        planService.deletePlan(planId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }
}
