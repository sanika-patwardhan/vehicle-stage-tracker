import React, { useState } from 'react';
import { SupplierDataDetails } from './index';

const App = () => {
  // Sample initial data
  const [vehicleMovements, setVehicleMovements] = useState([
    {
      id: "1",
      licensePlate: "ABC123",
      vin: "1HGCM82633A123456",
      contractNumber: "CONT-001",
      sourceStage: "Inspection",
      targetStage: "Maintenance",
      dateOfMovement: "2025-04-10",
      action: "Create",
      comment: "Initial inspection complete",
      executionDate: "2025-04-10T10:30:00Z",
      executedBy: "john.doe@example.com"
    },
    {
      id: "2",
      licensePlate: "XYZ789",
      vin: "5YJSA1E63MF123456",
      contractNumber: "CONT-002",
      sourceStage: "Maintenance",
      targetStage: "Ready for Sale",
      dateOfMovement: "2025-04-11",
      action: "Update",
      comment: "Maintenance completed",
      executionDate: "2025-04-11T14:20:00Z",
      executedBy: "jane.smith@example.com"
    }
  ]);

  // Handle new movement
  const handleAddMovement = (movement) => {
    setVehicleMovements([movement, ...vehicleMovements]);
    console.log('New movement added:', movement);
  };

  // Handle CSV upload
  const handleBulkUpload = (movements) => {
    setVehicleMovements([...movements, ...vehicleMovements]);
    console.log('Bulk upload:', movements);
  };

  return (
    <div className="app">
     <SupplierDataDetails />
    </div>
  );
};

export default App;