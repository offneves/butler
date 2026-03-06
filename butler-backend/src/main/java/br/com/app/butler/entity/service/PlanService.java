package br.com.app.butler.entity.service;

import br.com.app.butler.entity.dto.request.PlanRequest;
import br.com.app.butler.entity.dto.response.PlanResponse;
import java.util.List;


public interface PlanService {

    List<PlanResponse> getAllPlans();

    PlanResponse getPlanById(Long planId);

    PlanResponse createPlan(PlanRequest planRequest);

    PlanResponse updatePlan(Long planId, PlanRequest planRequest);

    void deletePlan(Long planId);
}
