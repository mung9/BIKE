import http from "./http";

const rentEndPoint = "api/user/rent";
const userEndPoint = "api/user";

export async function returnBike(rentalSpot, index, bike) {
  const response = await http.post(
    `${rentEndPoint}/${rentalSpot._id}/${index}`,
    bike
  );
  return response;
}

export async function rentBike(rentalSpot, index) {
  const response = await http.post(
    `${rentEndPoint}/${rentalSpot._id}/${index}`
  );
  return response;
}

export async function getUser(id) {
  const response = await http.get(`${userEndPoint}/${id}`);
  return response;
}
