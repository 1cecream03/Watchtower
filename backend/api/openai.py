import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_movie_recommendation(description):
    prompt = f"Recommend a movie based on this description: {description}. Just give me the name of the movie."

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a movie expert."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0.7,
    )

    return response.choices[0].message.content.strip()
