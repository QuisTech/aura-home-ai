const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testKey() {
  const genAI = new GoogleGenerativeAI("AIzaSyCx0QkdcdOTbMVDg5DPheYFH8pvUDxO4g8");
  try {
    console.log("📍 Testing Next-Gen Gemini 2.5 Flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Aura, are you alive?");
    const response = await result.response;
    console.log("✅ AURA: 2.5 Flash Connection Established!");
    console.log("📍 Response:", response.text());
  } catch (error) {
    console.error("❌ AURA: 2.5 Flash Connection Failed", error.message);
  }
}

testKey();
