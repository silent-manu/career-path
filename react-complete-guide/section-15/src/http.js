export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  if (!response.ok) {
    throw new Error("Failed to update");
  }

  const data = await response.json();
  return data.message;
}

export async function getUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  const data = await response.json();
  return data.places;
}
