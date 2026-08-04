export const API_URL = 'https://api.trendsmcp.ai/api';

export interface SourceOption {
	name: string;
	value: string;
	description: string;
}

export const KEYWORD_SOURCES: SourceOption[] = [
	{ name: 'Google Search', value: 'google search', description: 'Google search volume' },
	{ name: 'Google Images', value: 'google images', description: 'Google image search volume' },
	{ name: 'Google News', value: 'google news', description: 'Google News search volume' },
	{ name: 'Google Shopping', value: 'google shopping', description: 'Google Shopping search volume' },
	{ name: 'YouTube', value: 'youtube', description: 'YouTube search volume' },
	{ name: 'TikTok', value: 'tiktok', description: 'TikTok hashtag volume' },
	{ name: 'Reddit', value: 'reddit', description: 'Subreddit subscribers' },
	{ name: 'Amazon', value: 'amazon', description: 'Amazon product search volume' },
	{ name: 'Wikipedia', value: 'wikipedia', description: 'Wikipedia page views' },
	{ name: 'News Volume', value: 'news volume', description: 'News article mention volume' },
	{ name: 'News Sentiment', value: 'news sentiment', description: 'News sentiment score' },
	{ name: 'App Downloads', value: 'app downloads', description: 'Android app downloads (AppBrain)' },
	{ name: 'App Rankings', value: 'app rankings', description: 'Android app store ranking charts' },
	{ name: 'NPM', value: 'npm', description: 'Npm package weekly downloads' },
	{ name: 'Steam', value: 'steam', description: 'Steam concurrent players (monthly)' },
];

export const TOP_TREND_TYPES: SourceOption[] = [
	{ name: 'Google Trends', value: 'Google Trends', description: 'Top trending search terms on Google' },
	{ name: 'Google News Top News', value: 'Google News Top News', description: 'Top news stories from Google News' },
	{ name: 'TikTok Trending Hashtags', value: 'TikTok Trending Hashtags', description: 'Top trending hashtags on TikTok' },
	{ name: 'TikTok Trending Searches', value: 'TikTok Trending Searches', description: 'Top trending search terms on TikTok' },
	{ name: 'TikTok Shop Hot Products', value: 'TikTok Shop Hot Products', description: 'Top hot products on TikTok Shop' },
	{ name: 'YouTube Trending', value: 'YouTube Trending', description: 'Top trending videos on YouTube' },
	{ name: 'X (Twitter) Trending', value: 'X (Twitter) Trending', description: 'Top trending topics on X' },
	{ name: 'Reddit Hot Posts', value: 'Reddit Hot Posts', description: "Hottest posts on Reddit's front page" },
	{ name: 'Reddit World News', value: 'Reddit World News', description: 'Top posts in r/worldnews' },
	{ name: 'Wikipedia Trending', value: 'Wikipedia Trending', description: 'Most-viewed Wikipedia articles today' },
	{ name: 'Amazon Best Sellers Top Rated', value: 'Amazon Best Sellers Top Rated', description: 'Amazon top-rated best sellers' },
	{ name: 'Amazon Best Sellers by Category', value: 'Amazon Best Sellers by Category', description: 'Amazon best sellers by product category' },
	{ name: 'App Store Top Free', value: 'App Store Top Free', description: 'Top free apps on the iOS App Store' },
	{ name: 'App Store Top Paid', value: 'App Store Top Paid', description: 'Top paid apps on the iOS App Store' },
	{ name: 'Google Play', value: 'Google Play', description: 'Top apps on Google Play' },
	{ name: 'Top Websites', value: 'Top Websites', description: 'Most-visited websites globally' },
	{ name: 'Spotify Top Podcasts', value: 'Spotify Top Podcasts', description: 'Top podcasts on Spotify' },
	{ name: 'Steam Most Played', value: 'Steam Most Played', description: 'Top games by concurrent live players' },
	{ name: 'GitHub Trending Repos', value: 'GitHub Trending Repos', description: 'Daily trending repositories' },
	{ name: 'IMDb MOVIEmeter', value: 'IMDb MOVIEmeter', description: 'Top 100 most-popular movies' },
	{ name: 'Open Library Trending Books', value: 'Open Library Trending Books', description: 'Daily trending books' },
];

export const GROWTH_PERIODS: SourceOption[] = [
	{ name: '7 Days', value: '7D', description: 'Last 7 days' },
	{ name: '14 Days', value: '14D', description: 'Last 14 days' },
	{ name: '30 Days', value: '30D', description: 'Last 30 days' },
	{ name: '1 Month', value: '1M', description: 'Last month' },
	{ name: '2 Months', value: '2M', description: 'Last 2 months' },
	{ name: '3 Months', value: '3M', description: 'Last 3 months' },
	{ name: '6 Months', value: '6M', description: 'Last 6 months' },
	{ name: '9 Months', value: '9M', description: 'Last 9 months' },
	{ name: '12 Months', value: '12M', description: 'Last 12 months' },
	{ name: '18 Months', value: '18M', description: 'Last 18 months' },
	{ name: '24 Months', value: '24M', description: 'Last 24 months' },
	{ name: '36 Months', value: '36M', description: 'Last 36 months' },
	{ name: '48 Months', value: '48M', description: 'Last 48 months' },
	{ name: '60 Months', value: '60M', description: 'Last 60 months' },
	{ name: 'Month to Date', value: 'MTD', description: 'Growth from the start of the current month' },
	{ name: 'Quarter to Date', value: 'QTD', description: 'Growth from the start of the current quarter' },
	{ name: 'Year to Date', value: 'YTD', description: 'Growth from the start of the current year' },
];
