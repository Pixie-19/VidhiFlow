import { z } from 'zod';

export const caseSummaryPropsSchema = z.object({
  caseNumber: z.string(),
  title: z.string().describe('Case title or short description'),
  court: z.string(),
  stage: z.string().describe('Current stage e.g. evidence, arguments'),
  nextDate: z.string().optional(),
  parties: z.array(z.object({
    name: z.string(),
    role: z.enum(['petitioner', 'respondent', 'advocate', 'witness']),
  })).optional(),
});

export type CaseSummaryProps = z.infer<typeof caseSummaryPropsSchema>;
