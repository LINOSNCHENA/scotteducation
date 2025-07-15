"use client";

import { googleMap } from "@/app/utils/Branding/ApiRoutes";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { ArrowPathIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Libraries, Autocomplete } from "@react-google-maps/api";
import { CURRENT_ROUTE, DEFAULT_CENTER, DEFAULT_ZOOM, OFFICE_LOCATIONS, Route } from "@/app/utils/DirectionsToOfficer";
import { COMP_ADDRESS } from "@/app/utils/Branding/DataPascal";

// Constants
const MAP_CONTAINER_STYLE: React.CSSProperties = {
  width: "100%",
  height: "800px",
  minHeight: "600px",
};

const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];
const DIRECTION_RETRY_LIMIT = 3;
const DIRECTION_RETRY_DELAY = 1000;

type TravelMode = "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";

const OfficeDirections: React.FC = () => {
  // State management
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("DRIVING");
  const [error, setError] = useState<string | null>(null);
  const [isFetchingDirections, setIsFetchingDirections] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<Route>(CURRENT_ROUTE);
  const [useCustomOrigin, setUseCustomOrigin] = useState(false);
  const [customOrigin, setCustomOrigin] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Refs
  const mapRef = useRef<google.maps.Map | null>(null);
  const retryCountRef = useRef(0);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMap || "",
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: "en",
    region: "ZM",
  });

  useEffect(() => {
    if (!googleMap) {
      setApiError("Google Maps API key is missing. Please check your configuration.");
      console.error("Google Maps API key is missing");
    }
  }, []);

  const getErrorMessage = (status: string): string => {
    const ERROR_MESSAGES: Record<string, string> = {
      NOT_FOUND: "One or more locations could not be found.",
      ZERO_RESULTS: "No route could be found between the locations.",
      INVALID_REQUEST: "Invalid request. Please check the addresses.",
      OVER_QUERY_LIMIT: "API query limit exceeded. Please try again later.",
      REQUEST_DENIED: "Request denied. Verify your API key.",
      UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
      DEFAULT: "Failed to load directions. Please try again later.",
    };
    return ERROR_MESSAGES[status] || ERROR_MESSAGES.DEFAULT;
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setCustomOrigin(place.formatted_address);
      }
    }
  };

  const fetchDirections = useCallback(async () => {
    if (!directionsServiceRef.current || !window.google) return;

    setIsFetchingDirections(true);
    setError(null);

    try {
      const origin = useCustomOrigin ? customOrigin : currentRoute.origin;

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsServiceRef.current?.route(
          {
            origin,
            destination: COMP_ADDRESS,
            travelMode: travelMode as google.maps.TravelMode,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK && result) {
              resolve(result);
            } else {
              reject(status);
            }
          }
        );
      });

      setIsFetchingDirections(false);
      setDirections(result);

      if (mapRef.current && result.routes[0]?.bounds) {
        mapRef.current.fitBounds(result.routes[0].bounds);
      }
      retryCountRef.current = 0;
    } catch (status) {
      setIsFetchingDirections(false);
      const statusString = typeof status === "string" ? status : "UNKNOWN_ERROR";

      if (statusString === "UNKNOWN_ERROR" && retryCountRef.current < DIRECTION_RETRY_LIMIT) {
        retryCountRef.current += 1;
        setTimeout(fetchDirections, DIRECTION_RETRY_DELAY);
        return;
      }

      setError(`Failed to fetch directions: ${getErrorMessage(statusString)}`);
      retryCountRef.current = 0;
    }
  }, [travelMode, currentRoute, useCustomOrigin, customOrigin]);

  useEffect(() => {
    if (isLoaded && window.google && !directionsServiceRef.current) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      fetchDirections();
    }
  }, [isLoaded, currentRoute, fetchDirections]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleTravelModeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTravelMode(e.target.value as TravelMode);
  }, []);

  const handleCustomOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOrigin(e.target.value);
  };

  const handleRouteChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeKey = e.target.value;
    if (routeKey === "custom") {
      setUseCustomOrigin(true);
    } else {
      setUseCustomOrigin(false);
      const selectedRoute = OFFICE_LOCATIONS[routeKey as keyof typeof OFFICE_LOCATIONS];
      if (selectedRoute) {
        setCurrentRoute(selectedRoute);
      }
    }
  }, []);

  const resetMap = useCallback(() => {
    setDirections(null);
    setError(null);
    setTravelMode("DRIVING");
    setCurrentRoute(CURRENT_ROUTE);
    setUseCustomOrigin(false);
    setCustomOrigin("");
    if (mapRef.current) {
      mapRef.current.setCenter(DEFAULT_CENTER);
      mapRef.current.setZoom(DEFAULT_ZOOM);
    }
  }, []);

  if (apiError) {
    return (
      <div className="p-6 text-red-600 text-center">
        {apiError}
        <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
          Google Cloud Console
        </a>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6 text-red-600 text-center">
        Failed to load Google Maps: {loadError.message.includes("InvalidKey") ? "Invalid API key" : loadError.message}
        <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">
          Learn more
        </a>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-6 text-center">
        <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-blue-600" />
        <p className="mt-2 text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    // <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-100 w-full">
    //   <div className="max-w-7xl mx-auto p-6 rounded-lg shadow-lg bg-white">
    <section className="w-full min-w-9xl py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="max-w-8xl mx-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-[85%]">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Directions | {COMP_ADDRESS}</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 rounded-lg overflow-hidden shadow-md">
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={DEFAULT_CENTER}
              zoom={DEFAULT_ZOOM}
              onLoad={onMapLoad}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                gestureHandling: "cooperative",
              }}
            >
              {directions && (
                <DirectionsRenderer
                  options={{
                    directions,
                    polylineOptions: {
                      strokeColor: "#2563eb",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </div>

          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="mb-4">
              <label htmlFor="route-selector" className="block text-sm font-medium text-gray-700 mb-1">
                Select Starting Point
              </label>
              <select
                id="route-selector"
                onChange={handleRouteChange}
                value={
                  useCustomOrigin ? "custom" : Object.keys(OFFICE_LOCATIONS).find((key) => OFFICE_LOCATIONS[key as keyof typeof OFFICE_LOCATIONS].origin === currentRoute.origin)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Object.entries(OFFICE_LOCATIONS).map(([key, route]) => (
                  <option key={key} value={key}>
                    {route.description}
                  </option>
                ))}
                <option value="custom">Custom Location</option>
              </select>
            </div>

            {useCustomOrigin && (
              <div className="mb-4">
                <label htmlFor="custom-origin" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Your Location
                </label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    id="custom-origin"
                    type="text"
                    value={customOrigin}
                    onChange={handleCustomOriginChange}
                    placeholder="Type your location"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ref={autocompleteRef}
                  />
                </Autocomplete>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="travel-mode" className="block text-sm font-medium text-gray-700 mb-1">
                Travel Mode
              </label>
              <select
                id="travel-mode"
                value={travelMode}
                onChange={handleTravelModeChange}
                disabled={isFetchingDirections}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
              >
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Bicycling</option>
                <option value="TRANSIT">Transit</option>
              </select>
            </div>

            <button
              onClick={fetchDirections}
              disabled={isFetchingDirections || (useCustomOrigin && !customOrigin)}
              className="mb-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingDirections ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <span>Get Directions</span>}
            </button>

            <button
              onClick={resetMap}
              disabled={isFetchingDirections}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
              Reset Map
            </button>

            {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

            <div className="text-gray-800 overflow-auto max-h-[400px]">
              {isFetchingDirections ? (
                <div className="text-center text-gray-600">
                  <ArrowPathIcon className="w-6 h-6 animate-spin mx-auto" />
                  <p className="mt-2">Loading directions...</p>
                </div>
              ) : directions ? (
                <>
                  <h3 className="text-lg font-medium mb-2">Route Details</h3>
                  <div className="mb-4 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">From:</span> {useCustomOrigin ? customOrigin : currentRoute.origin}
                    </p>
                    <p>
                      <span className="font-medium">To:</span> {COMP_ADDRESS}
                    </p>
                    {!useCustomOrigin && currentRoute.description && <p className="text-xs italic text-gray-500 mt-1">{currentRoute.description}</p>}
                    <p className="mt-2">
                      <span className="font-medium">Distance:</span> {directions.routes[0].legs[0].distance?.text}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> {directions.routes[0].legs[0].duration?.text}
                    </p>
                  </div>
                  <h4 className="font-medium mb-2 text-sm">Directions:</h4>
                  <ul className="space-y-2 text-sm">
                    {directions.routes[0].legs[0].steps.map((step, index) => (
                      <li key={index} className="border-b border-gray-200 pb-2 last:border-b-0" dangerouslySetInnerHTML={{ __html: step.instructions }} />
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-gray-500">No directions available. Select a travel mode to view the route.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeDirections;
