import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";

/**
 * SupplierDataDetails Component - Displays supplier data in a tabbed interface
 *
 * @param {Object} props - Component props
 * @param {Object} props.supplierData - Data from various suppliers
 * @returns {JSX.Element}
 */
const SupplierDataDetails = ({
  supplierData = {
    supplier1: {
      firstRegistrationDate: "2023-01-15",
      clientAvailableStartDate: "2023-02-01",
      inspectionDate: "2023-03-10",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      createdDate: "2023-01-01",
      modifiedDate: "2023-03-15",
      parkingLocation: "Lot A",
      parkingPlace: "Spot 42",
    },
    supplier2: {
      make: "Toyota",
      model: "Corolla",
      color: "Blue",
      km: 15000,
      type: "Sedan",
      herkomst: "Imported",
      location: "Warehouse 3",
      address: "123 Main St, Cityville",
      firstGateIn: "2023-01-05",
      gateIn: "2023-01-10",
      gateOut: "2023-01-20",
    },
    supplier3: {
      status: "In Transit",
      type: "Truck",
      statusDate: "2023-04-01",
      subType: "Heavy",
      createdAt: "2023-03-01",
      updatedAt: "2023-04-01",
      loadingTime: "2023-03-15 10:00",
      unloadingTime: "2023-03-15 14:00",
    },
    supplier4: {
      inspectionStatus: "Passed",
      inspectionDate: "2023-03-20",
      inspectionMileage: 12000,
      inspectionDossierId: "D12345",
      logDate: "2023-03-21",
      version: "1.0",
      progressDirection: "Forward",
      originalStatus: "Pending",
      progressStatus: "Completed",
      locationAddress: "456 Inspection Rd, Testville",
      parkingSpace: "Garage 5",
    },
  },
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, " $1").trim();
  };

  if (!supplierData) {
    return (
      <Box sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
        No supplier data available
      </Box>
    );
  }

  const hasSupplier1 = !!supplierData.supplier1;
  const hasSupplier2 = !!supplierData.supplier2;
  const hasSupplier3 = !!supplierData.supplier3;
  const hasSupplier4 = !!supplierData.supplier4;

  // Create available tabs
  const tabs = [];
  if (hasSupplier1)
    tabs.push({
      label: "Supplier 1",
      data: supplierData.supplier1,
      icon: <InventoryIcon fontSize="small" />,
    });
  if (hasSupplier2)
    tabs.push({
      label: "Supplier 2",
      data: supplierData.supplier2,
      icon: <DirectionsCarIcon fontSize="small" />,
    });
  if (hasSupplier3)
    tabs.push({
      label: "Supplier 3",
      data: supplierData.supplier3,
      icon: <LocalShippingIcon fontSize="small" />,
    });
  if (hasSupplier4)
    tabs.push({
      label: "Supplier 4",
      data: supplierData.supplier4,
      icon: <AssignmentIcon fontSize="small" />,
    });

  // Set initial active tab if not already set
  React.useEffect(() => {
    if (tabs.length > 0 && activeTab === 0) {
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].data) {
          setActiveTab(i);
          break;
        }
      }
    }
  }, [supplierData]);

  const renderDataSection = (data, title) => {
    if (!data) return null;

    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "rgba(60, 183, 46, 0.05)",
            borderTop: 1,
            borderColor: "rgba(60, 183, 46, 0.2)",
          }}
        >
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ fontWeight: "medium" }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Object.entries(data).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {formatKey(key)}
                  </Typography>
                  <Typography variant="body2">{value || "-"}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderSupplier1Content = () => {
    if (!hasSupplier1) return null;

    return (
      <Box sx={{ mt: 2 }}>
        {renderDataSection(supplierData.supplier1, "Administrative Data")}

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Important Dates
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier1?.firstRegistrationDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      First Registration
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.firstRegistrationDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.clientAvailableStartDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Client Available
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.clientAvailableStartDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.inspectionDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Inspection Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.inspectionDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.startDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Start Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.startDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.endDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      End Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.endDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.createdDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Created Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.createdDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier1?.modifiedDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Modified Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.modifiedDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {supplierData.supplier1?.parkingLocation && (
          <Accordion defaultExpanded sx={{ mt: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: "rgba(60, 183, 46, 0.05)",
                borderTop: 1,
                borderColor: "rgba(60, 183, 46, 0.2)",
              }}
            >
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ fontWeight: "medium" }}
              >
                Parking Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier1.parkingLocation}
                    </Typography>
                  </Box>
                </Grid>
                {supplierData.supplier1?.parkingPlace && (
                  <Grid item xs={6}>
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Parking Place
                      </Typography>
                      <Typography variant="body2">
                        {supplierData.supplier1.parkingPlace}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    );
  };

  const renderSupplier2Content = () => {
    if (!hasSupplier2) return null;

    return (
      <Box sx={{ mt: 2 }}>
        {renderDataSection(supplierData.supplier2, "Vehicle Information")}

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Vehicle Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier2?.make && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Make
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.make}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.model && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Model
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.model}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.color && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Color
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.color}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.km && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Mileage (km)
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.km}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.type && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.type}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.herkomst && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Herkomst
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.herkomst}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Location Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier2?.location && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Current Location
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.location}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.address && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.address}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Gate Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier2?.firstGateIn && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      First Gate In
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.firstGateIn}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.gateIn && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Gate In
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.gateIn}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier2?.gateOut && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Gate Out
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier2.gateOut}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  const renderSupplier3Content = () => {
    if (!hasSupplier3) return null;

    return (
      <Box sx={{ mt: 2 }}>
        {renderDataSection(supplierData.supplier3, "Transport Information")}

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Transport Status
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier3?.status && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.status}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.type && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.type}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.statusDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Status Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.statusDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.subType && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Sub Type
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.subType}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.createdAt && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.createdAt}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.updatedAt && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Updated At
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.updatedAt}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Timing Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier3?.loadingTime && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Loading Time
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.loadingTime}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier3?.unloadingTime && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Unloading Time
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier3.unloadingTime}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  const renderSupplier4Content = () => {
    if (!hasSupplier4) return null;

    return (
      <Box sx={{ mt: 2 }}>
        {renderDataSection(supplierData.supplier4, "Inspection Details")}

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Inspection Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier4?.inspectionStatus && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.inspectionStatus}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.inspectionDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.inspectionDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.inspectionMileage && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Mileage
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.inspectionMileage} km
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.inspectionDossierId && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Dossier ID
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.inspectionDossierId}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.logDate && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Log Date
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.logDate}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.version && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Version
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.version}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.progressDirection && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Progress Direction
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.progressDirection}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.originalStatus && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Original Status
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.originalStatus}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.progressStatus && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Progress Status
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.progressStatus}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "rgba(60, 183, 46, 0.05)",
              borderTop: 1,
              borderColor: "rgba(60, 183, 46, 0.2)",
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Location Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {supplierData.supplier4?.locationAddress && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.locationAddress}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {supplierData.supplier4?.parkingSpace && (
                <Grid item xs={6}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Parking Space
                    </Typography>
                    <Typography variant="body2">
                      {supplierData.supplier4.parkingSpace}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 0:
        return hasSupplier1 ? renderSupplier1Content() : null;
      case 1:
        return hasSupplier2 ? renderSupplier2Content() : null;
      case 2:
        return hasSupplier3 ? renderSupplier3Content() : null;
      case 3:
        return hasSupplier4 ? renderSupplier4Content() : null;
      default:
        return null;
    }
  };

  return (
    <Card elevation={2} sx={{ overflow: "hidden" }}>
      <CardContent>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 48,
                bgcolor: "rgba(60, 183, 46, 0.05)",
                "& .MuiTab-root": {
                  minHeight: 48,
                  textTransform: "none",
                  fontWeight: "medium",
                },
                "& .Mui-selected": {
                  color: "#3CB72E !important",
                  fontWeight: "bold",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#3CB72E",
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  icon={tab.icon}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>

          <Box
            sx={{
              overflow: "auto",
              p: 2,
            }}
          >
            {getTabContent()}
          </Box>
        </Paper>
      </CardContent>
    </Card>
  );
};

SupplierDataDetails.propTypes = {
  supplierData: PropTypes.shape({
    supplier1: PropTypes.object,
    supplier2: PropTypes.object,
    supplier3: PropTypes.object,
    supplier4: PropTypes.object,
  }),
};

export default SupplierDataDetails;
