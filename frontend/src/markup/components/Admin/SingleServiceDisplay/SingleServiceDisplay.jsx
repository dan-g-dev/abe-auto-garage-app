import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function SingleServiceDisplay({ service, onEditClick }) {
  return (
    <Card className="mb-1" style={{ borderRadius: "10px" }}>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h4>{service.service_name}</h4>
            <div>{service.service_description}</div>
            <div style={{ color: "red" }}>$ {service.service_price}</div>
            <div style={{ marginTop: "8px" }}>
              {service.active_service === 1 ? (
                <Badge bg="success" style={{ borderRadius: "20px" }}>
                  Active
                </Badge>
              ) : (
                <Badge bg="secondary" style={{ borderRadius: "20px" }}>
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <Button
            variant=""
            onClick={() => onEditClick(service)}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SingleServiceDisplay;
