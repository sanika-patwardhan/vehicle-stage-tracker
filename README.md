# Vehicle Stage Tracker

A React component for tracking vehicle movements through different stages.

## Installation

```bash
npm install vehicle-stage-tracker
```

## Usage

```jsx
import React, { useState } from 'react';
import { VehicleMovement } from 'vehicle-stage-tracker';
import 'vehicle-stage-tracker/dist/style.css'; // Import styles if needed

function App() {
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
    }
  ]);

  // Handle new movement
  const handleAddMovement = (movement) => {
    setVehicleMovements([movement, ...vehicleMovements]);
    // Additional logic like API calls could be added here
  };

  // Handle CSV upload
  const handleBulkUpload = (movements) => {
    setVehicleMovements([...movements, ...vehicleMovements]);
    // Additional logic like API calls could be added here
  };

  return (
    <div className="app">
      <VehicleMovement 
        data={vehicleMovements}
        onAddMovement={handleAddMovement}
        onBulkUpload={handleBulkUpload}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | Array | Vehicle movement data to display in the component |
| `onAddMovement` | Function | Callback function that is called when a new movement is added |
| `onBulkUpload` | Function | Callback function that is called when movements are uploaded via CSV |

## Data Format

Each vehicle movement object should have the following structure:

```javascript
{
  id: "1", // Unique identifier
  licensePlate: "ABC123", // License plate number
  vin: "1HGCM82633A123456", // Vehicle identification number
  contractNumber: "CONT-001", // Contract number
  sourceStage: "Inspection", // Source stage
  targetStage: "Maintenance", // Target stage
  dateOfMovement: "2025-04-10", // Date of movement (YYYY-MM-DD)
  action: "Create", // Action type: "Create", "Update", or "Delete"
  comment: "Initial inspection complete", // Optional comment
  executionDate: "2025-04-10T10:30:00Z", // When the action was executed
  executedBy: "john.doe@example.com" // Who executed the action
}
```

## CSV Format

For bulk uploads, the CSV file should have the following columns:

- License Plate
- VIN
- Contract number
- Source Stage
- Target Stage
- Date of movement
- Action (Create, Update, or Delete)
- Comment

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the package
npm run build
```

## License

MIT