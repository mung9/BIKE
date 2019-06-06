import http from "./http";

const rentEndPoint = "api/user/rent";
const returnEndPoint = "api/user/return";
const userEndPoint = "api/user";

export async function returnBike(rentalSpot, index, bike) {
  const response = await http.post(
    `${returnEndPoint}/${rentalSpot._id}/${index}`,
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

export async function getUser() {
  const response = await http.get(`${userEndPoint}/me`,);
  return response;
}
