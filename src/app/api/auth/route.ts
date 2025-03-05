import { adminAuth } from "@/config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idToken = searchParams.get('idToken');

  if (!idToken) {
    return NextResponse.json({ error: 'No se proporcionó un token de autenticación' }, { status: 400 });
  }

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 * 5 });
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    const response = NextResponse.redirect("/");

    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 5,
    });
    
    response.cookies.set('uid', uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 5,
    });

    return response;
  } catch (error: unknown) {
    console.error('Error al crear la sesión:', error);
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
  
}
