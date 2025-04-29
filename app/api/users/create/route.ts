import { ErrorResponseDto } from '@/app/lib/global-backend-api-response';

export type UserPlanEnum = 'standard_with_ads' | 'standard' | 'premium';

export interface CreateUserRequestDTO {
  email: string;
  password: string;
  plan: UserPlanEnum;
}

export interface CreateUserResponseDTO {
  id: string;
}

export async function POST(req: CreateUserRequestDTO) {
  const response = await fetch(process.env.NEXT_BACKEND_URL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  const result = (await response.json()) as CreateUserResponseDTO | ErrorResponseDto;

  return new Response(JSON.stringify(result), { status: response.status });
}
