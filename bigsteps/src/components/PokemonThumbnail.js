import React, { useState } from "react";
import Description from "./Description";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./PokemonThumbnail.css"; 

const PokemonThumbnail = ({
  id,
  name,
  image,
  type,
  height,
  weight,
  stat1,
  stat2,
  stat3,
  stat4,
  stat5,
  stat6,
  bs1,
  bs2,
  bs3,
  bs4,
  bs5,
  bs6,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <center>
      <div className="container text-center">
        <div
          className="card auto-fit"
          onClick={handleShow}
        >
          <motion.img
            src={image}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="card-img-top"
            alt={name}
          />
          <div className="card-body">
            <h5 className="card-title">{name.toUpperCase()}</h5>
            <small className="card-text">Type: {type}</small>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name.toUpperCase()} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Description
              weightpok={weight}
              heightpok={height}
              pokstat1={stat1}
              pokstat2={stat2}
              pokstat3={stat3}
              pokstat4={stat4}
              pokstat5={stat5}
              pokstat6={stat6}
              posbs1={bs1}
              posbs2={bs2}
              posbs3={bs3}
              posbs4={bs4}
              posbs5={bs5}
              posbs6={bs6}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </center>
  );
};

export default PokemonThumbnail;
