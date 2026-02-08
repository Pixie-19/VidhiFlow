import { z } from 'zod';

export const caseStatusCardPropsSchema = z.object({
  cnrNumber: z.string().describe('Case Number / CNR'),
  petitioner: z.string().describe('Petitioner name'),
  respondent: z.string().describe('Respondent name'),
  lastDate: z.string().describe('Last hearing date'),
  status: z.string().describe('Current case status'),
});

export type CaseStatusCardProps = z.infer<typeof caseStatusCardPropsSchema>;
