import http from './http';

const endPoint = "api/rentalspot";

export async function getRentalSpots() {
  const response = await http.get(`${endPoint}`);
  return response;
}

export async function getRentalSpot(id) {
  
}
