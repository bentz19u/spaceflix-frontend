import { SafeParseReturnType, ZodIssue } from 'zod';

export default function formatZodFormErrors<T>(
  result: SafeParseReturnType<T, T>,
) {
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      errors[issue.path[0]] = issue.message;
    });
    return { errors };
  }
  return {};
}
