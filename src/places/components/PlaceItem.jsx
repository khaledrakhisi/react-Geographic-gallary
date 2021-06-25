import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import "./PlaceItem.css";
import Map from "../../shared/components/UIElements/Map";
import { useMediaQuery } from "../../shared/components/Hooks/hook-useMediaQuery";

function PlaceItem(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);

  const showMap = () => {
    setIsModalOpen(true);
  };
  const closeMap = () => {
    setIsModalOpen(false);
  };

  const closeDeletionModal = () => setIsDeletionOpen(false);
  const openDeletionModal = () => setIsDeletionOpen(true);
  const deletePlace = () => {
    console.log("deleting...");
    setIsDeletionOpen(false);
  };

  // const mediaMatch = window.matchMedia('(max-width: 768px)');
  const mediaMatch = useMediaQuery("(min-width: 768px)");

  const styles = {
    container: (mediaMatch) => ({
      width: mediaMatch ? "31rem" : "20rem",
      left: mediaMatch ? "calc(50% - 15.5rem)" : "10%",
    }),
  };

  return (
    <React.Fragment>
      <Modal
        show={isModalOpen}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map coordinates={props.coordinates} zoom={15} />
        </div>
      </Modal>
      <Modal
        style={styles.container(mediaMatch)}
        show={isDeletionOpen}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={deletePlace}>Proceed</Button>
            <Button inverse onClick={closeDeletionModal}>
              Cancel
            </Button>
          </React.Fragment>
        }
      >
        <div className="center">
          <h3>Are you sure you want to proceed?</h3>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.imageUrl} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMap}>
              View on map
            </Button>
            {props.showEditButtons && <Button to={"/places/" + props.id}>Edit</Button>}
            {props.showEditButtons && <Button danger onClick={openDeletionModal}>
              Delete
            </Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
