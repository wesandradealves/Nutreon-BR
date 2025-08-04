import { successResponse } from '@/lib/api-utils';

export async function POST() {
  const response = successResponse({ message: 'Logout realizado com sucesso' });
  
  response.cookies.delete('nuvemshop_token');
  response.cookies.delete('nuvemshop_user_id');
  
  return response;
}