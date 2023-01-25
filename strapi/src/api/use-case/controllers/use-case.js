"use strict";

/**
 * use-case controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const childUseCaseRequest = (useCase) => {
  return strapi.service("api::use-case-step.use-case-step").find({
    filters: {
      use_case: { id: useCase.id },
    },
    populate: {
      use_case: true,
      ressource: {
        populate: {
          theme: true,
        },
      },
    },
  });
};

module.exports = createCoreController("api::use-case.use-case", () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const useCasesStepPromises = data.map((useCase) => {
      return childUseCaseRequest(useCase);
    });

    let finalUseCases = await Promise.all(useCasesStepPromises).then(
      (useCasesStep) => {
        return useCasesStep.map((useCaseStep) => {
          return {
            ...useCaseStep.results[0].use_case,
            steps: useCaseStep.results.map((step) => {
              const { use_case, ...stepWithoutUseCase } = step;
              return stepWithoutUseCase;
            }),
          };
        });
      }
    );

    const ressourcesPromises = finalUseCases.map((useCase) => {
      return strapi
        .controller("api::ressource.ressource")
        .customFind({
          filters: {
            id: { $in: useCase.steps.map((step) => step.ressource.id) },
          },
          populate: {
            theme: true,
            image: true,
          },
        })
        .then((ressources) => {
          return {
            useCase,
            ressources: ressources.data,
          };
        });
    });

    finalUseCases = await Promise.all(ressourcesPromises).then((responses) => {
      return responses.map((response) => {
        return {
          ...response.useCase,
          steps: response.useCase.steps.map((step) => {
            return {
              ...step,
              ressource: response.ressources.find(
                (r) => r.id === step.ressource.id
              ),
            };
          }),
        };
      });
    });

    return { data: finalUseCases, meta };
  },
  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    const useCaseSteps = await childUseCaseRequest(data);
    let finalUseCase = await Promise.all(useCaseSteps.results).then(
      (useCasesStep) => {
        return {
          ...useCasesStep[0].use_case,
          steps: useCasesStep.map((step) => {
            const { use_case, ...stepWithoutUseCase } = step;
            return stepWithoutUseCase;
          }),
        };
      }
    );

    const ressourcesPromises = finalUseCase.steps.map((step) => {
      return strapi
        .controller("api::ressource.ressource")
        .customFind({
          filters: {
            id: { $in: step.ressource.id },
          },
          populate: {
            theme: true,
            image: true,
          },
        })
        .then((ressources) => {
          return {
            step,
            ressources: ressources.data,
          };
        });
    });

    finalUseCase = await Promise.all(ressourcesPromises).then((responses) => {
      return {
        ...finalUseCase,
        steps: responses.map((response) => {
          return {
            ...response.step,
            ressource: response.ressources.find(
              (r) => r.id === response.step.ressource.id
            ),
          };
        }),
      };
    });

    return { data: finalUseCase };
  },
}));
