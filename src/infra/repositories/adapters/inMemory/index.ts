import { Repositories } from "@/src/domain/Repositories";

import { InMemoryAuthRepo } from "./InMemoryAuthRepo";
import { InMeMoryCategoryRepo } from "./InMeMoryCategoryRepo";
import { InMemoryCityRepo } from "./InMemoryCityRepo";

export const InMemoryRepositories: Repositories = {
  auth: new InMemoryAuthRepo(),
  city: new InMemoryCityRepo(),
  categories: new InMeMoryCategoryRepo(),
};
