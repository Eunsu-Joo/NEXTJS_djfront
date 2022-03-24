import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "./DashboardEventItem.module.scss";

export default function DashboardEventItem({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.id}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <div className={styles.control}>
        <Link href={`/events/edit/${evt.id}`}>
          <a className={styles.edit}>
            <FaPencilAlt /> <span>Edit Event</span>
          </a>
        </Link>
        <button className={styles.delete} onClick={() => handleDelete(evt.id)}>
          <FaTimes /> <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
