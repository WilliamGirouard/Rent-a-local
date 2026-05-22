import "./LocalDetail.css";
import { useLoaderData, Form, useActionData } from "react-router-dom";
import Maps, { Local } from "../../components/Maps";
import { useState } from "react";

interface LoaderData {
  local: Local & { pricePerDay: number };
  user: { id: number; role: string } | null;
}

export default function LocalDetail() {
  const { local, user } = useLoaderData() as LoaderData;
  const error = useActionData() as string;

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const images: string[] = local.images ?? [];
  const jours =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = jours * Number(local.pricePerDay ?? 0);

  return (
    <div className="page">
      <div className="container">
        <div className="infoPanel">
          <h1 className="title">{local.name}</h1>
          <p className="address">{local.address}</p>
          <p className="surface">{local.description}</p>
          <p className="price">
            ${Number(local.pricePerDay).toFixed(2)} / jour
          </p>

          <Form method="post">
            <input type="hidden" name="userId" value={user?.id ?? ""} />

            <div className="heures">
              <label className="heuresLabel">Date de début</label>
              <input
                type="date"
                className="heuresSelect"
                name="startDate"
                min={today}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />

              <label className="heuresLabel">Date de fin</label>
              <input
                type="date"
                className="heuresSelect"
                name="endDate"
                min={startDate || today}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                required
              />

              {jours > 0 && (
                <p className="priceEstimate">
                  {jours} jour{jours > 1 ? "s" : ""} ={" "}
                  <strong>${totalPrice.toFixed(2)}</strong>
                </p>
              )}

              {error && <p className="overlapError">{error}</p>}
            </div>

            <div className="miniMap">
              <Maps localDetailed={local} />
            </div>

            <button type="submit" className="reserveButton">
              Réserver maintenant
            </button>
          </Form>
        </div>
        {images.length === 0 ? (
          <div className="carouselEmpty">Aucune photo pour ce local </div>
        ) : (
          <div className="carousel">
            <img
              src={images[currentImage]}
              alt={local.name}
              className="carouselImage"
            />
            <button
              className="carouselBack"
              onClick={() =>
                setCurrentImage((i) => (i - 1 + images.length) % images.length)
              }
            >
              {"<"}
            </button>
            <button
              className="carouselNext"
              onClick={() => setCurrentImage((i) => (i + 1) % images.length)}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
