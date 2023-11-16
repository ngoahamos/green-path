import { BIKE_MODES, BIKE_OWNERSHIP } from "../common/config";

const AVERAGE_SPEED = 15;
const EMISSION_FACTOR = 0.2

export const calculate_riding_time_distance_and_emissions = (mode: string, riding_time = 1) => {
    let speed = AVERAGE_SPEED;  // Assume an average speed of 15 km/h for bicycles

    if (mode == BIKE_MODES.ELECTRIC) {
        speed = 20  // Assume an average speed of 20 km/h for electric bikes
    } else if (mode == BIKE_MODES.GASOLINE) {
        speed = 80 // Assume an average speed of 20 km/h for electric bikes
    }

    const distance = riding_time * speed;

    return distance * EMISSION_FACTOR;
}

export const calculate_car_carbon_emissions = (distance: number, fuel_type: string, fuel_consumption: number=1) => {
    // Constants for emission factors(in grams of CO2 per liter)
    const CO2_EMISSION_FACTOR_PETROL = 2.31  // Example value, replace with actual factor
    const CO2_EMISSION_FACTOR_DIESEL = 2.68  // Example value, replace with actual factor
    let emission_factor = 2.5; // this is for initializing only

    // Fuel - specific emission factor based on the fuel type
    if (fuel_type == "petrol") {
        emission_factor = CO2_EMISSION_FACTOR_PETROL
    } else if (fuel_type == "diesel") {
        emission_factor = CO2_EMISSION_FACTOR_DIESEL
    }

    // Calculate total emissions based on distance, fuel consumption, and emission factor
    let total_emissions = distance * (fuel_consumption / 100) * emission_factor

    // Adjust emissions based on car type(if applicable)
    if (fuel_type == "hybrid") {
        total_emissions *= 0.8
    } else if (fuel_type == "electric") {
        total_emissions *= .1  // Electric cars have no direct tailpipe emissions, but they do emit during the manufacturing process
    }

    return total_emissions

}

export const calculate_carbon_emissions_from_walking =(time: number, distance: number) => {
    // Constants for conversion factors
    const METABOLIC_EQUIVALENT_WALKING = 3.9  // Metabolic equivalent for walking (in METs)
    const CALORIES_PER_LITER_OF_OXYGEN = 5  // Calories burned per liter of oxygen consumed (in kcal)
    time *= 60; // convert to minutes

    // Calculate energy expenditure in calories
    const energy_expenditure = METABOLIC_EQUIVALENT_WALKING * time

    // Convert energy expenditure to liters of oxygen consumed
    const oxygen_consumed = energy_expenditure / CALORIES_PER_LITER_OF_OXYGEN

    // Estimate embodied emissions associated with food consumption
    // Use a conversion factor based on the carbon footprint of food production and transportation
    const CARBON_EMISSIONS_PER_LITER_OF_OXYGEN = 0.5  // This value is a general approximation and might not accurately represent the energy expenditure for every individual or type of physical activity.
    const embodied_emissions = oxygen_consumed * CARBON_EMISSIONS_PER_LITER_OF_OXYGEN

    return embodied_emissions
}


// FUNCTION calculateCarbonEmission(fromCity, toCity, travelClass)
//     distance = calculateDistance(fromCity, toCity)
//     carbonPerKm = lookupCarbonEmission(travelClass)
//     carbonEmission = distance * carbonPerKm
//     RETURN carbonEmission

// FUNCTION calculateDistance(fromCity, toCity)
//     distance = lookupDistance(fromCity, toCity)
//     RETURN distance

// FUNCTION lookupCarbonEmission(travelClass)
//     IF travelClass is "economy"
//         carbonPerKm = 0.080 // average carbon emission in kg/km for economy class
//     ELSE IF travelClass is "business"
//         carbonPerKm = 0.150 // average carbon emission in kg/km for business class
//     ELSE IF travelClass is "first"
//         carbonPerKm = 0.200 // average carbon emission in kg/km for first class
//     ELSE
//         carbonPerKm = 0.100 // default value for other travel classes
//     RETURN carbonPerKm

// FUNCTION lookupDistance(fromCity, toCity)
//     // Lookup the distance between two cities using a distance API or database
//     distance = API_CalculateDistance(fromCity, toCity)
//     RETURN distance



