package br.com.app.butler.entity.service.impl;

import br.com.app.butler.entity.dto.request.PlanRequest;
import br.com.app.butler.entity.dto.response.PlanResponse;
import br.com.app.butler.entity.exception.PlanCannotBeNullException;
import br.com.app.butler.entity.exception.PlanNameAlreadyInUseException;
import br.com.app.butler.entity.exception.PlanNotFoundException;
import br.com.app.butler.entity.exception.PlanRequestMismatchException;
import br.com.app.butler.entity.mapper.PlanMapper;
import br.com.app.butler.entity.model.PlanModel;
import br.com.app.butler.entity.repository.PlanRepository;
import br.com.app.butler.entity.service.PlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class PlanServiceImpl implements PlanService {

    private final PlanRepository planRepository;
    private final PlanMapper planMapper;

    public List<PlanResponse> getAllPlans() {
        return planRepository.findAll()
                .stream()
                .map(planMapper::planResponse)
                .toList();
    }

    public PlanResponse getPlanById(Long planId) {
        PlanModel plan = planRepository.findById(planId)
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        return planMapper.planResponse(plan);
    }

    public PlanResponse createPlan(PlanRequest planRequest) {

        if (planRequest == null) {
            throw new PlanCannotBeNullException("Plan request cannot be null.");
        }

        if (planRepository.existsByName(planRequest.name())) {
            throw new PlanNameAlreadyInUseException("Plan name already in use.");
        }

        PlanModel planToSave = PlanModel.builder()
                .name(planRequest.name())
                .description(planRequest.description())
                .maxAgents(planRequest.maxAgents())
                .maxToolsPerAgent(planRequest.maxToolsPerAgent())
                .active(planRequest.active())
                .createdAt(LocalDateTime.now())
                .build();

        planRepository.save(planToSave);

        return planMapper.planResponse(planToSave);

    }

    public PlanResponse updatePlan(@RequestParam Long planId, @Valid @RequestBody PlanRequest planRequest) {

        if (planRequest == null) {
            throw new PlanCannotBeNullException("Plan request cannot be null.");
        }

        if (!Objects.equals(planId, planRequest.id())) {
            throw new PlanRequestMismatchException("Requested Plan mismatch.");
        }

        PlanModel planToUpdate = planRepository.findById(planRequest.id())
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        planToUpdate.setName(planRequest.name());
        planToUpdate.setDescription(planRequest.description());
        planToUpdate.setMaxAgents(planRequest.maxAgents());
        planToUpdate.setMaxToolsPerAgent(planRequest.maxToolsPerAgent());
        planToUpdate.setActive(planRequest.active());
        planToUpdate.setUpdatedAt(LocalDateTime.now());

        planRepository.save(planToUpdate);

        return planMapper.planResponse(planToUpdate);

    }

    public void deletePlan(@PathVariable Long planId) {
        PlanModel planToDelete = planRepository.findById(planId)
                .orElseThrow(() -> new PlanNotFoundException("Plan not found."));

        planToDelete.setActive(false);
        planToDelete.setExpiredAt(LocalDateTime.now());

        planRepository.save(planToDelete);
    }

}
