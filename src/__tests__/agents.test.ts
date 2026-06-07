import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// ─── DemoDirectorAgent ───────────────────────────────────────────────
import { DemoDirectorAgent } from '../agents/video/DemoDirectorAgent.ts';

describe('DemoDirectorAgent', () => {
  it('getScript returns the full narration script as a single string', () => {
    const agent = new DemoDirectorAgent();
    const script = agent.getScript();

    assert.ok(typeof script === 'string');
    assert.ok(script.length > 500, 'Script should be substantial (>500 chars)');
  });

  it('script covers key Aura concepts', () => {
    const agent = new DemoDirectorAgent();
    const script = agent.getScript();

    assert.ok(script.includes('Aura Home AI'), 'Should mention product name');
    assert.ok(script.includes('Sovereignty'), 'Should mention sovereignty principle');
    assert.ok(script.includes('Finance Sentinel'), 'Should mention Finance agent');
    assert.ok(script.includes('MongoDB'), 'Should mention data storage');
    assert.ok(script.includes('Model Context Protocol'), 'Should mention MCP');
    assert.ok(script.includes('Command Console'), 'Should mention the Command Console');
  });

  it('script contains all 6 narration segments', () => {
    const agent = new DemoDirectorAgent();
    const script = agent.getScript();

    // Check for unique phrases from each segment
    assert.ok(script.includes('cognitive crisis'), 'Segment 1: cognitive crisis');
    assert.ok(script.includes('Seven Pillars'), 'Segment 2: Seven Pillars');
    assert.ok(script.includes('Multimodal Agentic Sensors'), 'Segment 3: sensors');
    assert.ok(script.includes('cockpit'), 'Segment 4: cockpit');
    assert.ok(script.includes('inflationary anomalies'), 'Segment 5: deep reasoning');
    assert.ok(script.includes('Persistent Sovereignty'), 'Segment 6: conclusion');
  });
});

// ─── VoiceoverAgent ──────────────────────────────────────────────────
import { VoiceoverAgent } from '../agents/voice/VoiceoverAgent.ts';

describe('VoiceoverAgent', () => {
  it('can be instantiated without errors', () => {
    const agent = new VoiceoverAgent();
    assert.ok(agent, 'VoiceoverAgent should instantiate successfully');
    assert.ok(typeof agent.generateNarration === 'function', 'Should have generateNarration method');
  });
});

// ─── VideoComposerAgent ──────────────────────────────────────────────
import { VideoComposerAgent } from '../agents/video/VideoComposerAgent.ts';

describe('VideoComposerAgent', () => {
  it('can be instantiated without errors', () => {
    const agent = new VideoComposerAgent();
    assert.ok(agent, 'VideoComposerAgent should instantiate successfully');
    assert.ok(typeof agent.finalizeDemo === 'function');
    assert.ok(typeof agent.generateWebPLoop === 'function');
    assert.ok(typeof agent.mergeAudioVideo === 'function');
  });
});
