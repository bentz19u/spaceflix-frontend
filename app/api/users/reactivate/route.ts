import { ErrorResponseDto } from '@/app/lib/global-backend-api-response';
import { UserPlanEnum } from '@/app/api/users/create/route';

export interface ReactivateRequestDTO {
  userId: string;
  plan: UserPlanEnum;
}

export async function POST(req: ReactivateRequestDTO) {
  const response = await fetch(
    process.env.NEXT_BACKEND_URL + '/users/' + req.userId + '/reactivation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    }
  );

  const result = (await response.json()) as void | ErrorResponseDto;

  return new Response(JSON.stringify(result), { status: response.status });
}
