import Link from "next/link";
import Image from "next/image";
import styles from "./EventItem.module.scss";
import defaultImage from "@/image/event-default.png";
export default function EventItem({ evt, id }) {
  const imgUrl = evt.image.data ? evt.image.data.attributes.url : defaultImage;
  const author =
    evt.users_permissions_user.data !== null
      ? evt.users_permissions_user.data.attributes.username
      : "Public";
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={imgUrl} width={240} height={140} alt="default image" objectFit="contain" />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("kr")} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
        <p>
          Author : <span>{author} </span>
        </p>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${id}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
