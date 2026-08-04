import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TrendsMcpApi implements ICredentialType {
	name = 'trendsMcpApi';

	displayName = 'TrendsMCP API';

	documentationUrl = 'https://trendsmcp.ai/docs';

	icon = { light: 'file:trendsmcp.svg', dark: 'file:trendsmcp.dark.svg' } as const;

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your TrendsMCP API key. Get one free at <a href="https://trendsmcp.ai" target="_blank">trendsmcp.ai</a> (100 requests/month, no credit card).',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.trendsmcp.ai',
			url: '/api',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				mode: 'get_top_trends',
				type: 'Google Trends',
				limit: 1,
			},
		},
	};
}
