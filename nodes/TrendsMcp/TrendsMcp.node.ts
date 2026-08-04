import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { API_URL, KEYWORD_SOURCES, TOP_TREND_TYPES, GROWTH_PERIODS } from './constants';

export class TrendsMcp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TrendsMCP',
		name: 'trendsMcp',
		icon: { light: 'file:trendsmcp.svg', dark: 'file:trendsmcp.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description:
			'Query behavioral trend data across Google, YouTube, TikTok, Reddit, Amazon, Wikipedia, npm, Steam and more. One API key, three operations.',
		defaults: {
			name: 'TrendsMCP',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'trendsMcpApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Time Series',
						value: 'getTimeSeries',
						description:
							'Historical weekly data for one source and keyword (~5 years, normalized 0-100). Quota: 1 request.',
						action: 'Get time series',
					},
					{
						name: 'Get Growth',
						value: 'getGrowth',
						description:
							'Point-to-point % change for one source and keyword over one or more periods. Quota: 1 request.',
						action: 'Get growth',
					},
					{
						name: 'Get Top Trends',
						value: 'getTopTrends',
						description:
							'Live ranked leaderboard for a platform feed (no keyword needed). Quota: 1 request per feed and page.',
						action: 'Get top trends',
					},
				],
				default: 'getTimeSeries',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['getTimeSeries', 'getGrowth'],
					},
				},
				options: KEYWORD_SOURCES.map((s) => ({
					name: s.name,
					value: s.value,
					description: s.description,
				})),
				default: 'google search',
				required: true,
				description: 'Data source for the keyword. For Get Growth, comma-separated sources are supported.',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getTimeSeries', 'getGrowth'],
					},
				},
				default: '',
				required: true,
				placeholder: 'bitcoin',
				description:
					'Keyword, brand, product, or topic. Format depends on source: npm needs the exact package name, app downloads/rankings need the Android bundle ID (e.g. com.openai.chatgpt), Steam needs the game display name.',
			},
			{
				displayName: 'Growth Periods',
				name: 'percentGrowth',
				type: 'multiOptions',
				displayOptions: {
					show: {
						operation: ['getGrowth'],
					},
				},
				options: GROWTH_PERIODS.map((p) => ({
					name: p.name,
					value: p.value,
					description: p.description,
				})),
				default: ['12M'],
				description: 'Preset periods to compare. All periods in one call count as a single request.',
			},
			{
				displayName: 'Feed Type',
				name: 'type',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['getTopTrends'],
					},
				},
				options: TOP_TREND_TYPES.map((t) => ({
					name: t.name,
					value: t.value,
					description: t.description,
				})),
				default: 'Google Trends',
				required: true,
				description: 'Live feed to retrieve. No keyword needed.',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getTopTrends'],
						type: ['Amazon Best Sellers by Category', 'Top Websites'],
					},
				},
				default: '',
				description: 'Optional category filter for Amazon Best Sellers by Category and Top Websites',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getTopTrends'],
					},
				},
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 200,
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getTopTrends'],
					},
				},
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Number of rows to skip for pagination. Each page counts as one request.',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let body: IDataObject;

				if (operation === 'getTimeSeries') {
					const source = this.getNodeParameter('source', i) as string;
					const keyword = this.getNodeParameter('keyword', i) as string;
					body = {
						mode: 'get_time_series',
						source,
						keyword,
					};
				} else if (operation === 'getGrowth') {
					const source = this.getNodeParameter('source', i) as string;
					const keyword = this.getNodeParameter('keyword', i) as string;
					const percentGrowth = this.getNodeParameter('percentGrowth', i) as string[];
					body = {
						mode: 'get_growth',
						source,
						keyword,
						percent_growth: percentGrowth.length > 0 ? percentGrowth : ['12M'],
					};
				} else if (operation === 'getTopTrends') {
					const type = this.getNodeParameter('type', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const category = this.getNodeParameter('category', i, '') as string;
					body = {
						mode: 'get_top_trends',
						type,
						limit,
						offset,
					};
					if (category) {
						body.category = category;
					}
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const options: IHttpRequestOptions = {
					method: 'POST',
					url: API_URL,
					headers: {
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				};

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'trendsMcpApi',
					options,
				);

				if (Array.isArray(response)) {
					for (const entry of response) {
						returnData.push({ json: entry as IDataObject, pairedItem: { item: i } });
					}
				} else if (response && typeof response === 'object') {
					returnData.push({ json: response as IDataObject, pairedItem: { item: i } });
				} else {
					returnData.push({ json: { result: response }, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
