export async function getMovieRecommendation(prompt) {
  console.log("Sending request with:", { prompt }); // Updated debug log
  
  const response = await fetch("http://localhost:8000/api/recommend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }), // Changed from 'description' to 'prompt'
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error("Failed to get recommendation");
  }

  const data = await response.json();
  console.log("Received data:", data);
  return data; // This will be { recommendation: "movie title" }
}