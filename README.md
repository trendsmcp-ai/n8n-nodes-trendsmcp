# n8n-nodes-trendsmcp

This is an [n8n](https://n8n.io) community node. It lets you use **[TrendsMCP](https://trendsmcp.ai)** in your n8n workflows.

TrendsMCP is a behavioral trend data API. One API key gives you access to search, social, and commerce trend data across **Google, YouTube, TikTok, Reddit, Amazon, Wikipedia, npm, Steam, the App Store, and more**. Query historical time series, growth percentages, or live top-trending feeds from any n8n workflow.

[n8n](https://n8n.io) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

**Verified install (recommended):** In n8n, open the nodes panel, search for **TrendsMCP**, and install it directly. (Requires an instance owner to enable community nodes; available on n8n v1.94.0+.)

**Manual install:** In **Settings → Community Nodes**, select **Install** and enter the npm package name:

```
n8n-nodes-trendsmcp
```

## Operations

The node exposes three operations that map to the TrendsMCP REST API:

| Operation | Mode | What it returns | Quota |
| --- | --- | --- | --- |
| **Get Time Series** | `get_time_series` | ~5 years of weekly data points for one `source` + `keyword` (normalized 0-100) | 1 request |
| **Get Growth** | `get_growth` | Point-to-point % change over one or more periods | 1 request |
| **Get Top Trends** | `get_top_trends` | Live ranked leaderboard for a platform feed (no keyword) | 1 request per feed and page |

### Data sources

**Keyword sources** (Get Time Series / Get Growth): Google Search, Google Images, Google News, Google Shopping, YouTube, TikTok, Reddit, Amazon, Wikipedia, News Volume, News Sentiment, App Downloads, App Rankings, npm, Steam.

**Live feeds** (Get Top Trends): Google Trends, Google News Top News, TikTok Trending Hashtags, TikTok Trending Searches, TikTok Shop Hot Products, YouTube Trending, X (Twitter) Trending, Reddit Hot Posts, Reddit World News, Wikipedia Trending, Amazon Best Sellers Top Rated, Amazon Best Sellers by Category, App Store Top Free, App Store Top Paid, Google Play, Top Websites, Spotify Top Podcasts, Steam Most Played, GitHub Trending Repos, IMDb MOVIEmeter, Open Library Trending Books.

## Credentials

You need a TrendsMCP API key.

1. Sign up at **[trendsmcp.ai](https://trendsmcp.ai)** (free tier: 100 requests/month, no credit card).
2. Your API key is emailed to you instantly.
3. In n8n, create a new **TrendsMCP API** credential and paste the key.

The credential is validated against a minimal `get_top_trends` call (1 request). Authentication is a simple `Authorization: Bearer` header.

## Usage

1. Add the **TrendsMCP** node to your workflow.
2. Select an **Operation** (e.g. *Get Time Series*).
3. Fill in the required fields (Source, Keyword, or Feed Type).
4. Run the workflow.

The node returns the raw API response. For time series, each weekly data point becomes a separate n8n item. For growth and top trends, the full response object is returned as one item.

**AI Agent tool:** this node is also `usableAsTool`, so an n8n AI Agent can call any TrendsMCP operation as a tool.

## Compatibility

- Requires **n8n v1.94.0+** for one-click verified installation.
- Built and tested with the `@n8n/node-cli` toolchain (Node.js 22+).
- Zero runtime dependencies.

## Resources

- [TrendsMCP documentation](https://trendsmcp.ai/docs)
- [TrendsMCP API reference](https://trendsmcp.ai/docs)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
