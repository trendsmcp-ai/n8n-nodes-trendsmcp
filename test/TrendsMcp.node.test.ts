import { describe, it, expect } from 'vitest';
import { TrendsMcp } from '../nodes/TrendsMcp/TrendsMcp.node';
import { KEYWORD_SOURCES, TOP_TREND_TYPES, GROWTH_PERIODS } from '../nodes/TrendsMcp/constants';

describe('TrendsMcp node', () => {
	it('should have the correct name and displayName', () => {
		const node = new TrendsMcp();
		expect(node.description.name).toBe('trendsMcp');
		expect(node.description.displayName).toBe('TrendsMCP');
	});

	it('should be usable as a tool', () => {
		const node = new TrendsMcp();
		expect(node.description.usableAsTool).toBe(true);
	});

	it('should require the trendsMcpApi credential', () => {
		const node = new TrendsMcp();
		expect(node.description.credentials).toEqual([
			{ name: 'trendsMcpApi', required: true },
		]);
	});

	it('should expose three operations', () => {
		const node = new TrendsMcp();
		const operationProp = node.description.properties.find((p) => p.name === 'operation');
		expect(operationProp).toBeDefined();
		expect(operationProp?.options).toHaveLength(3);
		const values = (operationProp?.options as Array<{ value: string }>).map((o) => o.value);
		expect(values).toEqual(['getTimeSeries', 'getGrowth', 'getTopTrends']);
	});
});

describe('constants', () => {
	it('should have keyword sources matching the API docs', () => {
		const values = KEYWORD_SOURCES.map((s) => s.value);
		expect(values).toContain('google search');
		expect(values).toContain('tiktok');
		expect(values).toContain('reddit');
		expect(values).toContain('amazon');
		expect(values).toContain('npm');
		expect(values).toContain('steam');
		expect(values).toContain('app downloads');
		expect(values).toContain('app rankings');
	});

	it('should have top trend types matching the API docs', () => {
		const values = TOP_TREND_TYPES.map((t) => t.value);
		expect(values).toContain('Google Trends');
		expect(values).toContain('TikTok Trending Hashtags');
		expect(values).toContain('YouTube Trending');
		expect(values).toContain('X (Twitter) Trending');
		expect(values).toContain('Reddit Hot Posts');
		expect(values).toContain('Amazon Best Sellers Top Rated');
		expect(values).toContain('GitHub Trending Repos');
		expect(values).toContain('IMDb MOVIEmeter');
	});

	it('should have growth periods matching the API docs', () => {
		const values = GROWTH_PERIODS.map((p) => p.value);
		expect(values).toContain('7D');
		expect(values).toContain('12M');
		expect(values).toContain('YTD');
		expect(values).toContain('MTD');
		expect(values).toContain('QTD');
	});
});
