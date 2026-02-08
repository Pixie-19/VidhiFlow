import { z } from 'zod';

export const summonsGeneratorPropsSchema = z.object({
  caseNumber: z.string().describe('Case number or CNR'),
  courtName: z.string().describe('Name of the court'),
  petitioner: z.string().describe('Petitioner name'),
  respondent: z.string().describe('Respondent name'),
  hearingDate: z.string().describe('Date of hearing (editable by judge)'),
  courtRoom: z.string().describe('Court room (editable by judge)'),
  purpose: z.string().optional().describe('Purpose of summons'),
});

export type SummonsGeneratorProps = z.infer<typeof summonsGeneratorPropsSchema>;
