import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, setAuthSession, clearAuthSession, isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { action, password } = await request.json();

    if (action === 'login') {
      if (!password) {
        return NextResponse.json(
          { error: 'Password is required' },
          { status: 400 }
        );
      }

      if (verifyPassword(password)) {
        await setAuthSession();
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
    }

    if (action === 'logout') {
      await clearAuthSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}

