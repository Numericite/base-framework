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
          console.log("response", {
            ...response,
            ressource: response.ressources.find(
              (r) => r.id === response.step.ressource.id
            ),
          });
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

    // let finalUseCase = await Promise.all(useCaseStep.results).then(
    //   (useCasesStep) => {
    //     return useCasesStep.map((useCaseStep) => {
    //       let { use_case, ...stepWithoutUseCase } = useCasesStep;
    //       let ressource = useCaseStep.ressource;
    //       const ressourceChildPromise = strapi
    //         .service(
    //           `api::ressource-${ressource.kind}.ressource-${ressource.kind}`
    //         )
    //         .find({
    //           filters: {
    //             ressource: { id: ressource.id },
    //           },
    //         });

    //       console.log("RESSOURCE CHILD", ressourceChildPromise);
    //     });
    //   }
    // );

    // console.log("FINALE", finalUseCase);

    let { use_case, ...stepWithoutUseCase } = useCaseStep.results[0];
    const ressource = useCaseStep.results[0].ressource;
    const ressource_child = await strapi
      .service(`api::ressource-${ressource.kind}.ressource-${ressource.kind}`)
      .find({
        filters: {
          ressource: { id: ressource.id },
        },
      });
    stepWithoutUseCase.ressource = {
      ...ressource,
      child_id: ressource_child.results[0].id,
      ...ressource_child.results[0],
    };

    // console.log(stepWithoutUseCase);

    // console.log({ data: { ...use_case, steps: [stepWithoutUseCase] } });

    // return { data: { ...use_case, steps: [stepWithoutUseCase] } };
  },
}));
