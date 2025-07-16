// import { COMP_ADDRESS } from "./Branding/NexusData";

import { COMP_ADDRESS } from "./Branding/DataPascal";

// Lusaka, Zambia coordinates (city center)
export type Route = {
    origin: string;
    destination: string;
    description?: string;
};

// Seven well-known locations in Lusaka with routes to Findeco House
export const OFFICE_LOCATIONS = {
    // From the international airport
    airportRoute: {
        origin: "Kenneth Kaunda International Airport, Lusaka",
        destination: COMP_ADDRESS,
        description: "Route from the international airport via T2 highway"
    },

    // From the largest shopping mall
    mandaHillRoute: {
        origin: "Manda Hill Shopping Centre, Great East Road, Lusaka",
        destination: COMP_ADDRESS,
        description: "Route from Lusaka's largest shopping mall (Manda Hill)"
    },

    // From the university
    unzaRoute: {
        origin: "University of Zambia (UNZA) Great East Road Campus",
        destination: COMP_ADDRESS,
        description: "Route from UNZA via Great East Road"
    },

    // From the government district
    governmentRoute: {
        origin: "Government Complex, Independence Avenue, Lusaka",
        destination: COMP_ADDRESS,
        description: "Route from the government district"
    },

    // From the popular shopping arcade
    arcadesRoute: {
        origin: "Arcades Shopping Centre, Great East Road, Lusaka",
        destination: COMP_ADDRESS,
        description: "Route from Arcades shopping center"
    },

    // From the main bus station
    busTerminalRoute: {
        origin: "Lusaka Intercity Bus Terminus, Dedan Kimathi Road",
        destination: COMP_ADDRESS,
        description: "Route from the main bus terminal"
    },

    // From the sports stadium
    stadiumRoute: {
        origin: "National Heroes Stadium, Lusaka",
        destination: COMP_ADDRESS,
        description: "Route from the national stadium"
    },

    // Current default (verified)
    current: {
        origin: "Radisson Blu Hotel, Cairo Road, Lusaka",
        destination: COMP_ADDRESS,
        description: "Short route through Cairo Road"
    }
} as const;

// Current selection (modify this to test different routes)
export const CURRENT_ROUTE: Route = OFFICE_LOCATIONS.current;
export const DEFAULT_CENTER = { lat: -15.4167, lng: 28.2833 };
export const DEFAULT_ZOOM = 12;