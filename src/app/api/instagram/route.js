import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const beholdFeedId = process.env.INSTAGRAM_BEHOLD_FEED_ID;
        const metaToken = process.env.INSTAGRAM_ACCESS_TOKEN;

        // 1. If user configured Behold.so Feed ID
        if (beholdFeedId) {
            try {
                const res = await fetch(`https://feeds.behold.so/${beholdFeedId}`, {
                    next: { revalidate: 3600 } // Cache for 1 hour
                });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const posts = data.slice(0, 6).map((post, idx) => ({
                            id: post.id || `behold-${idx}`,
                            title: post.caption ? post.caption.slice(0, 30) + '...' : 'Live Highland Dispatch',
                            subtitle: '@aanandham.go',
                            location: 'Himachal & Munnar Stays',
                            media_url: post.sizes?.medium?.mediaUrl || post.mediaUrl || post.thumbnailUrl,
                            permalink: post.permalink || 'https://www.instagram.com/aanandham.go/',
                            tag: 'LIVE DISPATCH',
                            caption: post.caption || ''
                        }));
                        return NextResponse.json({ success: true, source: 'behold', posts });
                    }
                }
            } catch (err) {
                console.warn('[Instagram API] Behold fetch error:', err.message);
            }
        }

        // 2. If user configured official Meta Instagram Graph API Token
        if (metaToken) {
            try {
                const res = await fetch(
                    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${metaToken}`,
                    { next: { revalidate: 3600 } }
                );
                if (res.ok) {
                    const data = await res.json();
                    if (data?.data?.length > 0) {
                        const posts = data.data.slice(0, 6).map((post, idx) => ({
                            id: post.id || `meta-${idx}`,
                            title: post.caption ? post.caption.split('\n')[0].slice(0, 32) : 'Live Highland Dispatch',
                            subtitle: '@aanandham.go',
                            location: 'Himachal & Munnar Stays',
                            media_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
                            permalink: post.permalink || 'https://www.instagram.com/aanandham.go/',
                            tag: post.media_type === 'VIDEO' ? 'REEL' : 'PHOTO',
                            caption: post.caption || ''
                        }));
                        return NextResponse.json({ success: true, source: 'meta_graph', posts });
                    }
                }
            } catch (err) {
                console.warn('[Instagram API] Meta Graph fetch error:', err.message);
            }
        }

        // 3. No external feed configured: Return empty list so no fake hardcoded mock posts are shown
        return NextResponse.json({
            success: true,
            source: 'none',
            posts: []
        });
    } catch (error) {
        console.error('[Instagram API] Error:', error);
        return NextResponse.json({
            success: false,
            source: 'none',
            posts: []
        });
    }
}
