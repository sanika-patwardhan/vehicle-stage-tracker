import React, { useState } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import VehicleMovementList from "./VehicleMovementList";
import VehicleMovementForm from "./VehicleMovementForm";
import CSVUpload from "./CSVUpload";

/**
 * VehicleMovement Component
 * @param {Object} props
 * @param {Array} props.data - Vehicle movement data to display
 * @param {Function} props.onAddMovement - Callback when a new movement is added
 * @param {Function} props.onBulkUpload - Callback when movements are uploaded via CSV
 * @param {Function} props.getSupplierData - Function to get supplier data for a vehicle
 * @returns {JSX.Element}
 */
const VehicleMovement = ({
  data = [],
  onAddMovement,
  onBulkUpload,
  getSupplierData,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("list");

  /**
   * Handle adding a new vehicle movement
   * @param {Object} formData - The form data for the movement
   */
  const handleAddMovement = (formData) => {
    try {
      setLoading(true);
      
      // Create a new movement with additional fields
      const newMovement = {
        ...formData,
        id: Date.now().toString(),
        executionDate: new Date().toISOString(),
        executedBy: "current.user@example.com" // In a real app, this would come from auth
      };
      
      // Call the callback if provided
      if (onAddMovement) {
        onAddMovement(newMovement);
      }
    } catch (err) {
      setError(`Failed to add movement: ${err.message}`);
      console.error("Error adding movement:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle bulk upload of vehicle movements via CSV
   * @param {Array} csvData - Array of vehicle movement data from CSV
   */
  const handleCSVUpload = (csvData) => {
    try {
      setLoading(true);
      
      // Process the CSV data
      const processedData = csvData.map(data => ({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        executionDate: new Date().toISOString(),
        executedBy: "CSV Import",
        ...data
      }));
      
      // Call the callback if provided
      if (onBulkUpload) {
        onBulkUpload(processedData);
      }
    } catch (err) {
      setError(`Failed to process CSV: ${err.message}`);
      console.error("Error processing CSV:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button 
              className="float-right font-bold" 
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        <Box sx={{ width: '100%' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab 
              label="Vehicle Movements" 
              value="list"
              disabled={loading}
            />
            <Tab 
              label="Add Movement" 
              value="add"
              disabled={loading}
            />
          </Tabs>
          
          {activeTab === "list" && (
            <Box sx={{ mt: 4 }}>
              <Card>
                <Box sx={{ p: 3, pb: 1 }}>
                  <Typography variant="h5" component="div">
                    Vehicle Movement History
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Track all vehicle movements between stages
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <CSVUpload onUpload={handleCSVUpload} isLoading={loading} />
                  </Box>
                </Box>
                <CardContent>
                  <VehicleMovementList movements={data} />
                </CardContent>
              </Card>
            </Box>
          )}
          
          {activeTab === "add" && (
            <Box sx={{ mt: 4 }}>
              <Card>
                <Box sx={{ p: 3, pb: 1 }}>
                  <Typography variant="h5" component="div">
                    Add Vehicle Movement
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Move a vehicle from one stage to another
                  </Typography>
                </Box>
                <CardContent>
                  <VehicleMovementForm 
                    onSubmit={handleAddMovement} 
                    isLoading={loading}
                  />
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </main>
    </div>
  );
};

export default VehicleMovement;