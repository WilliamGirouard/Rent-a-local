import { Form, Link, useNavigation, useActionData } from "react-router-dom";
import "./CreateLocal.css"
import "../Reservations/ChangeRequest.css";
import { useState } from "react";
import { geocodingAddress } from "../../services/api";
import { setMaxListeners } from "events";

export default function CreateLocal() {
  const navigation = useNavigation();
  const error = useActionData() as string;
  const isSubmitting = navigation.state === "submitting";

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const canSubmit = !!lat  && !!lng;
  const [geocoding, setGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  async function handleAddressBlur(event : React.FocusEvent<HTMLInputElement>) {
    const address = event.target.value.trim();
    if (!address) return;
    setGeocoding(true);
    setGeocodingError("");
    try {
      const data = await geocodingAddress(address)
      if (data.length > 0) {
        const latNumber = Number(data[0].lat);
        const lngNumber = Number(data[0].lon);
        setLat(latNumber);
        setLng(lngNumber);
      } else {
        setGeocodingError("L'adresse n'a pas pu être trouvée.")
      }
    }catch (error : unknown) {
      setGeocodingError("Erreur de récupération des données.");
    } finally {
      setGeocoding(false);
    }
  }

  return (
    <>
      <div className="edit-reservation-page">
        <div className="edit-header">
          <p className="edit-eyebrow">Admin</p>
          <h1>Ajouter un local</h1>
          <p className="edit-address">Remplissez les informations du nouveau local</p>
        </div>

        <div className="edit-card">
          <h2 className="edit-card-title">Informations du local</h2>

          <Form method="post" encType="multipart/form-data" className="edit-form">
            <div className="edit-field">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Studio Ghibli"
                required
              />
            </div>

            <div className="edit-field">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="5545 Rue Saint-Michel, Montreal"
                onBlur={handleAddressBlur}
                required

              />
              {geocoding && <span className="edit-info">Recherche...</span>}
              {geocodingError && <span className="edit-info-error">{geocodingError}</span>}
            </div>

            <div className="edit-field">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Beau local au centre-ville..."
                required
              />
            </div>

            <div className="edit-field">
              <label htmlFor="pricePerDay">Prix par jour ($)</label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                placeholder="125.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="edit-field">
              <label htmlFor="images">Photos du local</label>
              <label htmlFor="images" className="file-upload-box">
                <span className="file-upload-text">Cliquer ici pour choisir vos fichiers</span>
              </label>
              <input type="file" id="images" name="images" accept="image/jpeg, image/png, image/webp" multiple required/>
              <span className="file-upload-info">5 photos au format : JPG, PNG , WEBP, 5 mb/photo</span>
            </div>

              <input
                type="hidden"
                id="lat"
                name="lat"
                value={lat ?? ""}/>

              <input
                type="hidden"
                id="lng"
                name="lng"
                value={lng ?? ""}/>

            {error && <p className="form-error">{error}</p>}

            <div className="edit-actions">
              <Link to="/admin" className="edit-btn-cancel">
                Annuler
              </Link>
              <button
                type="submit"
                className="edit-btn-submit"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? "Création..." : "Créer le local"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}