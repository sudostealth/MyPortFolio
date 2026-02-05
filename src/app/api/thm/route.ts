import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  let fallbackRank = "Top 1%"; // Default safe fallback

  try {
    // 0. Load personal.json for fallback value
    try {
      const personalPath = path.join(process.cwd(), 'src/data/personal.json');
      const personalData = JSON.parse(fs.readFileSync(personalPath, 'utf8'));
      if (personalData.stats?.tryhackmeRank) {
        fallbackRank = personalData.stats.tryhackmeRank;
      }
    } catch (e) {
      console.error("Could not load personal.json for fallback", e);
    }

    // 1. Read socials.json to get the username
    const socialsPath = path.join(process.cwd(), 'src/data/socials.json');
    const socialsData = fs.readFileSync(socialsPath, 'utf8');
    const socials = JSON.parse(socialsData);

    const thmLink = socials.find((s: any) => s.name === "TryHackMe");
    
    if (!thmLink) {
      return NextResponse.json({ rank: fallbackRank, source: 'fallback' });
    }

    // Extract username from URL
    const urlParts = thmLink.url.split('/').filter(Boolean);
    const username = urlParts[urlParts.length - 1];

    // If placeholder, return fallback from personal.json
    if (!username || username === "yourusername") {
       return NextResponse.json({ 
         rank: fallbackRank,
         source: 'fallback'
       });
    }

    // 2. Fetch data from TryHackMe API
    const response = await fetch(`https://tryhackme.com/api/v2/public-profile?username=${username}`, {
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch from TryHackMe');
    }

    const data = await response.json();

    if (data.status === "error") {
        return NextResponse.json({ rank: 0, rankText: fallbackRank, source: 'fallback' });
    }

    // 3. Format result
    let rankText = "N/A";
    
    if (data.data.topPercentage) {
      rankText = `Top ${data.data.topPercentage}%`;
    } else if (data.data.rank) {
      rankText = `#${data.data.rank.toLocaleString()}`;
    } else {
       rankText = fallbackRank;
    }
    
    return NextResponse.json({
      rank: data.data.rank || 0,
      rankText: rankText,
      badges: data.data.badges || [],
      points: data.data.points || 0,
      completedRooms: data.data.completedRooms || 0
    });

  } catch (error) {
    console.error('THM API Error, using fallback:', error);
    // Return fallback value instead of error to keep UI clean
    return NextResponse.json({ 
       rank: 0, 
       rankText: fallbackRank, // Use fallback from personal.json
       source: 'fallback' 
    });
  }
}
