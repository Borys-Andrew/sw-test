import { Company } from "@/types";

export const fetchCompanies = (): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch("http://localhost:3001/companies");
      const data = await response.json();
      resolve(data);
    }, 800);
  });
};
