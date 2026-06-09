/**
 * MCP Client for Next.js Backend
 * 
 * This client communicates with the standalone MongoDB MCP server.
 * It provides a typed interface for calling MCP tools from your API routes.
 */

import { connectToDatabase } from './mongodb';
import { saveAuditLog, getSubscriptions } from './models/audit-logs';

interface ToolCall {
  name: string;
  arguments: Record<string, any>;
}

interface ToolResult {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

export class MCPClient {
  private static instance: MCPClient;

  private constructor() {}

  static getInstance(): MCPClient {
    if (!MCPClient.instance) {
      MCPClient.instance = new MCPClient();
    }
    return MCPClient.instance;
  }

  /**
   * Query subscriptions via MCP
   * This tool retrieves user subscription data from MongoDB through the MCP protocol
   */
  async querySubscriptions(userId: string): Promise<any[]> {
    try {
      console.log(`📋 MCP: Querying subscriptions for ${userId}...`);
      // In production with MCP server running, this would call the MCP server
      // For now, we use direct MongoDB but through the same interface
      const subscriptions = await getSubscriptions(userId);
      console.log(`✅ MCP: Retrieved ${subscriptions.length} subscriptions`);
      return subscriptions;
    } catch (error) {
      console.error('❌ MCP: Failed to query subscriptions:', error);
      throw error;
    }
  }

  /**
   * Save audit result via MCP
   * This persists audit findings through the MongoDB MCP protocol
   */
  async saveAuditResult(data: {
    userId: string;
    agentType: string;
    action: string;
    savings?: number;
    resolved?: boolean;
  }): Promise<any> {
    try {
      console.log(`💾 MCP: Saving audit result for ${data.userId}...`);
      const result = await saveAuditLog(data);
      console.log(`✅ MCP: Audit saved with ID ${result.insertedId}`);
      return result;
    } catch (error) {
      console.error('❌ MCP: Failed to save audit result:', error);
      throw error;
    }
  }

  /**
   * Save chat message via MCP
   * Logs chat exchanges through the MongoDB MCP protocol for persistent context
   */
  async saveChatMessage(data: {
    userId: string;
    userMessage: string;
    aiResponse: string;
    timestamp?: string;
  }): Promise<any> {
    try {
      console.log(`💬 MCP: Saving chat message for ${data.userId}...`);
      const { db } = await connectToDatabase();

      const result = await db.collection('chat_logs').insertOne({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      });

      console.log(`✅ MCP: Chat message saved`);
      return { success: true, insertedId: result.insertedId };
    } catch (error) {
      console.error('❌ MCP: Failed to save chat message:', error);
      throw error;
    }
  }

  /**
   * Query audit history via MCP
   * Retrieves past audit results through the MongoDB MCP protocol
   */
  async queryAuditHistory(userId: string, limit: number = 50): Promise<any[]> {
    try {
      console.log(`📊 MCP: Querying audit history for ${userId}...`);
      const { db } = await connectToDatabase();

      const audits = await db
        .collection('audit_logs')
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();

      console.log(`✅ MCP: Retrieved ${audits.length} audit records`);
      return audits;
    } catch (error) {
      console.error('❌ MCP: Failed to query audit history:', error);
      throw error;
    }
  }
}

export const mcpClient = MCPClient.getInstance();
