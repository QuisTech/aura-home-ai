async function testGenerateActionLogic(apiKeyStatus: 'active' | 'expired') {
  console.log(`\n======================================================`);
  console.log(`🧪 TESTING SCENARIO: Gemini API Key is ${apiKeyStatus.toUpperCase()}`);
  console.log(`======================================================`);
  
  // 1. Mock the Gemini model behavior exactly how the Google SDK works
  const mockModel = {
    generateContent: async (prompt: string) => {
      if (apiKeyStatus === 'expired') {
        throw new Error("API key expired. Please renew the API key.");
      }
      
      // If the key is active, simulate a successful Google API response
      return {
        response: {
          text: () => JSON.stringify({
            action: "[100% REAL GEMINI] Dynamically analyzed smart fridge sensors.",
            breakdown: "[100% REAL GEMINI] This proves the true API was successfully hit and the mock was ignored.",
            estimatedSavings: 99.99
          })
        }
      };
    }
  };

  // 2. Run the EXACT try/catch logic from our Next.js API route
  let aiData;
  try {
    console.log("--> Attempting to call model.generateContent()...");
    const result = await mockModel.generateContent("fake prompt");
    let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    aiData = JSON.parse(text);
    console.log("✅ SUCCESS: Gemini API responded perfectly. Ignoring fallbacks.");
  } catch (apiError: any) {
    console.log(`❌ GOOGLE API ERROR CAUGHT: ${apiError.message}`);
    console.log("🔄 Triggering resilient hackathon fallback...");
    
    aiData = { 
      action: "FALLBACK MOCK: Rerouted automated investments.", 
      breakdown: "FALLBACK MOCK: Detected idle cash.", 
      estimatedSavings: 14.50 
    };
  }

  // 3. Print the final result that would be saved to MongoDB
  console.log("\n💾 FINAL DATA SAVED TO MONGODB:");
  console.log(aiData);
}

async function runTests() {
  // Test 1: Simulate the API key working (what happens when you pay the $10)
  await testGenerateActionLogic('active');
  
  // Test 2: Simulate the API key being dead (current hackathon state)
  await testGenerateActionLogic('expired');
}

runTests();
