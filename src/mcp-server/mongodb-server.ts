#!/usr/bin/env node

/**
 * Aura MongoDB MCP Server
 * 
 * This is a standalone Model Context Protocol (MCP) server that provides
 * Gemini AI with standardized access to MongoDB for persistent data storage.
 * 
 * It runs as a separate process and communicates with the Next.js app via stdio.
 * This ensures proper MCP protocol compliance for the hackathon.
 * 
 * Run with: npm run mcp-server
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import { MongoClient, Db } from 'mongodb';

class AuraMCPServer {
  private server: Server;
  private mongoClient: MongoClient;
  private db: Db | null = null;
  private mongoUri: string;

  constructor() {
    this.mongoUri = process.env.MONGODB_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/aura';
    this.mongoClient = new MongoClient(this.mongoUri);
    
    this.server = new Server({
      name: 'aura-mongodb-mcp',
      version: '1.0.0',
    });

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getAvailableTools(),
      };
    });

    // Handle tool calls from Gemini
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return this.handleToolCall(request);
    });
  }

  private getAvailableTools(): Tool[] {
    return [
      {
        name: 'query_subscriptions',
        description: 'Query user subscriptions from MongoDB to audit for leaks',
        inputSchema: {
          type: 'object' as const,
          properties: {
            userId: {
              type: 'string',
              description: 'The user ID to query subscriptions for',
            },
          },
          required: ['userId'],
        },
      },
      {
        name: 'save_audit_result',
        description: 'Save an audit result to MongoDB',
        inputSchema: {
          type: 'object' as const,
          properties: {
            userId: { type: 'string', description: 'User ID' },
            agentType: { type: 'string', description: 'Type of agent (e.g., finance, energy)' },
            action: { type: 'string', description: 'Action taken' },
            savings: { type: 'number', description: 'Amount saved' },
            resolved: { type: 'boolean', description: 'Whether issue was resolved' },
          },
          required: ['userId', 'agentType', 'action'],
        },
      },
      {
        name: 'save_chat_message',
        description: 'Save a chat message exchange to the audit log',
        inputSchema: {
          type: 'object' as const,
          properties: {
            userId: { type: 'string', description: 'User ID' },
            userMessage: { type: 'string', description: 'User message' },
            aiResponse: { type: 'string', description: 'AI response' },
            timestamp: { type: 'string', description: 'ISO timestamp' },
          },
          required: ['userId', 'userMessage', 'aiResponse'],
        },
      },
      {
        name: 'query_audit_history',
        description: 'Query audit history for a user',
        inputSchema: {
          type: 'object' as const,
          properties: {
            userId: { type: 'string', description: 'User ID' },
            limit: { type: 'number', description: 'Maximum results (default 50)' },
          },
          required: ['userId'],
        },
      },
    ];
  }

  private async handleToolCall(request: any): Promise<any> {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'query_subscriptions':
          return await this.querySubscriptions(args.userId);
        case 'save_audit_result':
          return await this.saveAuditResult(args);
        case 'save_chat_message':
          return await this.saveChatMessage(args);
        case 'query_audit_history':
          return await this.queryAuditHistory(args.userId, args.limit || 50);
        default:
          return {
            content: [
              {
                type: 'text',
                text: `Unknown tool: ${name}`,
              },
            ],
            isError: true,
          };
      }
    } catch (error) {
      console.error(`Error executing tool ${name}:`, error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }

  private async querySubscriptions(userId: string): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    
    const subscriptions = await this.db
      .collection('subscriptions')
      .find({ userId })
      .toArray();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(subscriptions, null, 2),
        },
      ],
    };
  }

  private async saveAuditResult(data: any): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    
    const result = await this.db.collection('audit_logs').insertOne({
      ...data,
      timestamp: new Date(),
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, insertedId: result.insertedId }),
        },
      ],
    };
  }

  private async saveChatMessage(data: any): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    
    const result = await this.db.collection('chat_logs').insertOne({
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, insertedId: result.insertedId }),
        },
      ],
    };
  }

  private async queryAuditHistory(userId: string, limit: number): Promise<any> {
    if (!this.db) throw new Error('Database not connected');
    
    const audits = await this.db
      .collection('audit_logs')
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(audits, null, 2),
        },
      ],
    };
  }

  async start() {
    try {
      console.log('🔌 Aura MongoDB MCP Server: Connecting to MongoDB...');
      await this.mongoClient.connect();
      this.db = this.mongoClient.db('aura');
      
      // Test connection
      await this.db.admin().ping();
      console.log('✅ MongoDB connected successfully');

      // Start MCP server with stdio transport
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      console.log('🚀 Aura MongoDB MCP Server running on stdio transport');
    } catch (error) {
      console.error('❌ Failed to start MCP server:', error);
      process.exit(1);
    }
  }

  async shutdown() {
    await this.mongoClient.close();
    process.exit(0);
  }
}

// Main execution
const server = new AuraMCPServer();
server.start();

process.on('SIGINT', () => server.shutdown());
process.on('SIGTERM', () => server.shutdown());
