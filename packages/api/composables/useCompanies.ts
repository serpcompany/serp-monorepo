// import type {
//   Company,
//   EntitiesResponse,
//   EntitiesParams
// } from '@serp/types/types';

// export default function () {
//   const { $api } = useNuxtApp();
//   const module = 'company';

//   return {
//     async getCompanies(params: EntitiesParams) {
//       if (!params.page) params.page = 1;
//       if (!params.limit) params.limit = 50;

//       return $api<EntitiesResponse<Company>>('/entities', {
//         query: {
//           module,
//           ...params
//         }
//       });
//     },
//     async getCompanyCategories() {},
//     async getCompany() {},
//     async getTopics() {}
//     // ...others company related calls
//   };
// }
