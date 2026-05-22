// API URL
const BASE_URL = process.env.REACT_APP_BASE_URL || "/v1";

async function request(path: string, options: any = {}) {
  const token = localStorage.getItem("token");
  const { isMultipart, ...fetchOptions} = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      ...(!isMultipart && {"Content-Type": "application/json"}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...fetchOptions,
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem("token");
  }

  if (!res.ok) {
    throw {
      message: data.message ?? "Request failed",
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

// Requetes GET
export async function getReservations() {
  return await request("/reservations");
}

export async function getReservationByMe() {
  return await request("/reservations/me");
}

export async function getReservation(id: string) {
  return await request(`/reservations/${id}`);
}

export async function getLocals() {
  return await request("/locals");
}

export async function getMyReservations() {
  return await request("/reservations/me");
}

export async function getLocalById(id: string) {
  return await request(`/locals/${id}`);
}

export async function getUsers() {
  return await request("/users");
}

export async function getChangeRequests() {
  return await request("/change-requests");
}

// Requetes Auth
export const loginUser = async (credentials: any) =>
  await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const registerUser = async (credentials: any) =>
  await request("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getCurrentUser = async () => {
  return await request("/auth/profile");
};

// Requetes POST
export async function createContactMail(mail: any) {
  return await request("/contact", {
    method: "POST",
    body: JSON.stringify(mail),
  });
}

export async function createReservation(body: {
  startDate: string;
  endDate: string;
  userId: number;
  localId: number;
}) {
  return await request("/reservations", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function payReservation(id: number) {
  return await request(`/payments/${id}`, {
    method: "POST",
  });
}

export async function createChangeRequest(body: {
  newStartDate: string;
  newEndDate: string;
  reservationId: number;
  userId: number;
}) {
  return await request("/change-requests", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function createLocal(formData: FormData) {
  return await request("/locals", {
    method: "POST",
    body: formData,
    isMultipart: true,
  });
}

// Requetes PATCH
export async function updateUserInfo(credentials: any) {
  return await request("/users/:id", {
    method: "PATCH",
    body: JSON.stringify(credentials),
  });
}

export async function updateReservation(id: number, body: any) {
  return await request(`/reservations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function approveChangeRequest(id: number) {
  return await request(`/change-requests/${id}/approve`, { method: "PATCH" });
}

export async function rejectChangeRequest(id: number) {
  return await request(`/change-requests/${id}/reject`, { method: "PATCH" });
}

export async function upgradeUserToAdmin(id: number) {
  return await request(`/users/${id}/privileges`, {
    method: "PATCH"
})};

export async function toggleReservationPaymentStatus(id: number, paid: boolean) {
  return await request(`/reservations/${id}/payment-status`, {
    method: "PATCH",
    body: JSON.stringify({ paid }),
})};

// Requetes DELETE
export async function deleteReservation(id: number) {
  return await request(`/reservations/${id}`, { method: "DELETE" });
}

//GeoCoding pour la search bar adresse dans createLocal
export async function geocodingAddress(address : string) {
  const request = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);

  if (!request.ok) throw new Error("Geocoding n'a pas fonctionné");
  return request.json();
}