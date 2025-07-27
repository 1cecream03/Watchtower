

export async function getMovieRecommendation(prompt) {
  const response = await fetch("http://localhost:8000/api/recommend/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to get recommendation");
  }

  const data = await response.json();
  return data.recommendation;
}
