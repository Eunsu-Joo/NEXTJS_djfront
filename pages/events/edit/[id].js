import Layout from "@/components/Layout";
import moment from "moment";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL, POPULATE_FILTER } from "@/config/index";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { parseCookie } from "@/helpers/index";
export default function EditPage({ data, token }) {
  const { attributes: evt } = data;
  const [attributes, setAttributes] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    date: evt.date,
    address: evt.address,
    time: evt.time,
    description: evt.description,
    image: evt.image,
  });
  const [imgPreview, setImagePreview] = useState(
    evt.image.data ? evt.image.data.attributes.url : null
  );
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmptyFiled = Object.values(attributes).some((elem) => elem === "");
    if (!token) {
      toast.error("Please Login");
      return false;
    }
    if (isEmptyFiled) {
      toast.error("Please Fill all fields");
      return false;
    } else {
      if (evt.image.data && evt.image.data.attributes.url !== imgPreview) {
        await axios
          .delete(`${API_URL}/api/upload/files/${evt.image.data.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch((err) => toast.error(`image error! ${err}`));
      }
      const res = await fetch(`${API_URL}/api/events/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: attributes }),
      });
      if (res.status === 401 || res.status === 403) {
        toast.error("No Authorization. Check your Account");
        return false;
      } else {
        toast.success("success submit!");
        setTimeout(() => {
          router.push(`/events/${data.id}`);
        }, 1500);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttributes({ ...attributes, [name]: value });
  };
  const imageChanged = (data) =>
    setAttributes({ ...attributes, image: { id: +data.id, attributes: data } });
  const imageUploaded = (data) => {
    setImagePreview(data.url);
    setIsShow(false);
  };
  return (
    <Layout>
      <Link href="/events">
        <a>
          <BsArrowLeftShort /> Go Back
        </a>
      </Link>
      <h1>Edit EventPage</h1>
      <ToastContainer hideProgressBar />
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <div className="grid">
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={attributes.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={attributes.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={attributes.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={attributes.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={attributes.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={attributes.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={attributes.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Image Preview</h2>
      {imgPreview ? (
        <Image src={imgPreview} width={220} height={160} alt="preview image" objectFit="cover" />
      ) : (
        <div>
          <p>No Image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setIsShow(true)}>
          <FaImage /> Upload Image
        </button>
      </div>
      <Modal show={isShow} onClose={() => setIsShow(false)}>
        <ImageUpload
          imageChanged={imageChanged}
          evtId={data.id}
          token={token}
          imageUploaded={imageUploaded}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { data } = await axios
    .get(`${API_URL}/api/events/${id}?${POPULATE_FILTER}`)
    .then((res) => res.data);
  const { token } = parseCookie(req);
  return {
    props: { data, token: token ? token : null },
  };
}
