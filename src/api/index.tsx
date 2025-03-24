import { Company } from "@/types";

export const fetchCompanies = (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch("/src/mocks/companies-lookup.json");
      const data = await response.json();
      resolve(data);
    }, 600);
  });
};
