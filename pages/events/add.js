import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import Image from "next/image";
import { parseCookie } from "@/helpers/index";
export default function AddEventPage({ token }) {
  const [attributes, setAttributes] = useState({
    name: "",
    performers: "",
    venue: "",
    date: "",
    address: "",
    time: "",
    description: "",
    image: "",
  });
  const [imgPreview, setImagePreview] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmptyFiled = Object.values(attributes).some((elem) => elem === "");
    if (isEmptyFiled) {
      toast.error("Please Fill all fields");
      return false;
    } else {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: attributes }),
      });
      if (res.status === 403 || res.status === 401) {
        toast.error("No Token Includes");
        return false;
      } else {
        toast.success("success submit!");
        setTimeout(() => {
          router.push("/account/dashboard");
        }, 1500);
      }
    }
  };
  const imageChanged = (data) =>
    setAttributes({ ...attributes, image: { id: +data.id, attributes: data } });
  const imageUploaded = (data) => {
    setImagePreview(data.url);
    setIsShow(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttributes({ ...attributes, [name]: value });
  };
  return (
    <Layout title="디제잉 이벤트 추가하기">
      <Link href="/events">
        <a>
          <BsArrowLeftShort /> Go Back
        </a>
      </Link>
      <h1>AddEventPage</h1>
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
        <input type="submit" value="Add Event" className="btn" />
      </form>
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
        <ImageUpload imageChanged={imageChanged} token={token} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  return { props: { token } };
}
