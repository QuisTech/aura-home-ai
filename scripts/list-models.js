const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI("AIzaSyCx0QkdcdOTbMVDg5DPheYFH8pvUDxO4g8");
  try {
    console.log("📍 Listing available models for your key...");
    // We use a raw fetch to bypass any SDK model mapping issues
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCx0QkdcdOTbMVDg5DPheYFH8pvUDxO4g8`);
    const data = await response.json();
    if (data.models) {
      console.log("✅ Models Found:");
      data.models.forEach(m => console.log(`- ${m.name}`));
    } else {
      console.log("❌ No models found or error:", JSON.stringify(data));
    }
  } catch (error) {
    console.error("❌ AURA: Model Listing Failed", error.message);
  }
}

listModels();
