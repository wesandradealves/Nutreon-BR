import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Remover cookies
  response.cookies.delete('nuvemshop_token');
  response.cookies.delete('nuvemshop_user_id');
  
  return response;
}