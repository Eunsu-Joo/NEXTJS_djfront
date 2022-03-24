import React, { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "./ImageUpload.module.scss";
import axios from "axios";
import { MdUpload } from "react-icons/md";
export default function ImageUpload({ evtId, imageUploaded, token, imageChanged }) {
  const [image, setImage] = useState(null);
  const id = evtId ? evtId : null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", id);
    formData.append("filed", "image");
    await axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        imageChanged(res.data[0]);
        imageUploaded(res.data[0]);
      })
      .catch((error) => console.log(error));
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.file}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          {image && (
            <p>
              {image.name.length > 20
                ? `${image.name.slice(0, 19)}.${image.type}`
                : `${image.name}`}
            </p>
          )}
          <input type="file" id="file" onChange={handleFileChange} />
          <label htmlFor="file" className={styles.fileBtn}>
            <MdUpload /> Find Image
          </label>
          <input type="submit" value="Upload" className="btn-secondary" />
        </div>
      </form>
    </div>
  );
}
