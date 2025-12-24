import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPortfolioData, updateProfile, type Profile } from '@/lib/data';

export async function GET() {
    try {
        const data = await getPortfolioData();
        return NextResponse.json({ profile: data.profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { profile }: { profile: Profile } = await request.json();

        // Basic validation
        if (!profile.name || !profile.title) {
            return NextResponse.json(
                { error: 'Name and Title are required' },
                { status: 400 }
            );
        }

        const updatedData = await updateProfile(profile);
        return NextResponse.json({ success: true, profile: updatedData.profile });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
