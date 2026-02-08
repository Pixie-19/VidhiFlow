import type { TamboComponent } from '@tambo-ai/react';
import { caseStatusCardPropsSchema } from '@/lib/schemas/case-status';
import { summonsGeneratorPropsSchema } from '@/lib/schemas/summons';
import { CaseStatusCard } from './CaseStatusCard';
import { SummonsGenerator } from './SummonsGenerator';

/**
 * Registered Tambo components with strict Zod schemas.
 * CaseStatusCard: CNR, petitioner, respondent, lastDate, status.
 * SummonsGenerator: withInteractable — judge edits hearingDate & courtRoom; state syncs to thread.
 */
export const vidhiFlowComponents: TamboComponent[] = [
  {
    name: CaseStatusCard.name,
    description: CaseStatusCard.description,
    component: CaseStatusCard.component,
    propsSchema: CaseStatusCard.propsSchema,
  },
  {
    name: 'SummonsGenerator',
    description: 'Editable summons for final orders. Judge can adjust hearingDate and courtRoom in the UI; state syncs back to the thread.',
    component: SummonsGenerator,
    propsSchema: summonsGeneratorPropsSchema,
  },
];
