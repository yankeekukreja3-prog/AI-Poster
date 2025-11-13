// This file contains a sample offline dataset of Kepler exoplanet candidates.
// The data has been synthetically expanded to simulate a large catalog (~1500 planets)
// for demonstrating the AI pipeline. This ensures the app is fast, reliable, and works offline.
// NOTE: Randomness is seeded for deterministic, reproducible results.

let seed = 12345; // Fixed seed for determinism
function seededRandom() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
}

const basePlanetData = [{"pl_name":"Kepler-1343 b","pl_rade":1.03,"pl_insol":0.93,"pl_orbper":11.0964172,"pl_eqt":262,"st_teff":5001,"st_rad":0.71,"disc_facility":"Kepler","pl_masse":2.7,"pl_dens":12.5,"pl_orbsmax":0.08,"st_mass":0.7,"st_lum":0.3,"disc_year":2016,"discoverymethod":"Transit"},{"pl_name":"Kepler-22 b","pl_rade":2.1,"pl_insol":1.11,"pl_orbper":289.86,"pl_eqt":262,"st_teff":5518,"st_rad":0.96,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.85,"st_mass":0.97,"st_lum":0.79,"disc_year":2011,"discoverymethod":"Transit"},{"pl_name":"Kepler-186 f","pl_rade":1.17,"pl_insol":0.29,"pl_orbper":129.94,"pl_eqt":188,"st_teff":3754,"st_rad":0.52,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.4,"st_mass":0.54,"st_lum":0.05,"disc_year":2014,"discoverymethod":"Transit"},{"pl_name":"Kepler-442 b","pl_rade":1.34,"pl_insol":0.68,"pl_orbper":112.3053,"pl_eqt":233,"st_teff":4402,"st_rad":0.6,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.41,"st_mass":0.61,"st_lum":0.11,"disc_year":2015,"discoverymethod":"Transit"},{"pl_name":"Kepler-62 f","pl_rade":1.41,"pl_insol":0.38,"pl_orbper":267.291,"pl_eqt":208,"st_teff":4925,"st_rad":0.64,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.72,"st_mass":0.69,"st_lum":0.21,"disc_year":2013,"discoverymethod":"Transit"},{"pl_name":"Kepler-1229 b","pl_rade":1.34,"pl_insol":0.46,"pl_orbper":86.829,"pl_eqt":213,"st_teff":3723,"st_rad":0.54,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.31,"st_mass":0.54,"st_lum":0.06,"disc_year":2016,"discoverymethod":"Transit"},{"pl_name":"Kepler-1649 c","pl_rade":1.06,"pl_insol":0.75,"pl_orbper":19.53527,"pl_eqt":234,"st_teff":3240,"st_rad":0.29,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":0.08,"st_mass":0.2,"st_lum":0.05,"disc_year":2020,"discoverymethod":"Transit"},{"pl_name":"Kepler-452 b","pl_rade":1.5,"pl_insol":1.11,"pl_orbper":384.84,"pl_eqt":265,"st_teff":5757,"st_rad":1.11,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":1.05,"st_mass":1.04,"st_lum":1.22,"disc_year":2015,"discoverymethod":"Transit"},{"pl_name":"KIC-10905746 b","pl_rade":1.15,"pl_insol":0.99,"pl_orbper":358.7,"pl_eqt":265,"st_teff":5800,"st_rad":0.99,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":1.0,"st_mass":1.0,"st_lum":1.0,"disc_year":2017,"discoverymethod":"Transit"},{"pl_name":"KOI-4878.01","pl_rade":1.04,"pl_insol":0.92,"pl_orbper":449.03,"pl_eqt":256,"st_teff":5880,"st_rad":1.05,"disc_facility":"Kepler","pl_masse":null,"pl_dens":null,"pl_orbsmax":1.12,"st_mass":1.1,"st_lum":1.0,"disc_year":2015,"discoverymethod":"Transit"}];

const expandedData = [];
for (let i = 0; i < 5; i++) {
    basePlanetData.forEach(planet => {
        const newPlanet = JSON.parse(JSON.stringify(planet));
        // Make the name unique for each copy
        if (i > 0) {
            newPlanet.pl_name = `${planet.pl_name.split(' ')[0]} ${planet.pl_name.split(' ')[1]}-${i}`;
        }
        // Slightly randomize key values to create a more diverse dataset
        newPlanet.pl_rade *= (1 + (seededRandom() - 0.5) * 0.2);
        newPlanet.pl_insol *= (1 + (seededRandom() - 0.5) * 0.2);
        newPlanet.pl_orbper *= (1 + (seededRandom() - 0.5) * 0.2);
        newPlanet.pl_eqt = newPlanet.pl_eqt ? newPlanet.pl_eqt + Math.round((seededRandom() - 0.5) * 50) : null;
        expandedData.push(newPlanet);
    });
}
// Add some extra random planets for more variety
for (let i = 0; i < 50; i++) {
    const base = basePlanetData[i % basePlanetData.length];
    expandedData.push({
        ...JSON.parse(JSON.stringify(base)),
        pl_name: `K-RAND-${Math.floor(seededRandom() * 9000) + 1000}.${String(i+1).padStart(2,'0')}`,
        pl_rade: seededRandom() * 3 + 0.5,
        pl_insol: seededRandom() * 2 + 0.1,
        pl_orbper: seededRandom() * 400 + 10,
        pl_eqt: Math.floor(seededRandom() * 600) + 150,
    });
}

// Now generate a large number of additional candidates
const NUM_NEW_PLANETS = 1398; // Adjusted to bring total to 1500
const propertyRanges = {
    pl_rade: { min: 0.4, max: 25 }, // Earth radii
    pl_insol: { min: 0.1, max: 1500 }, // Earth flux
    pl_orbper: { min: 0.5, max: 1200 }, // days
    pl_eqt: { min: 80, max: 2800 }, // Kelvin
    st_teff: { min: 2400, max: 10000 }, // Kelvin
    st_rad: { min: 0.1, max: 10 }, // Solar radii
    pl_masse: { min: 0.1, max: 1000 }, // Earth masses
    pl_dens: { min: 0.3, max: 20 }, // g/cm^3
    pl_orbsmax: { min: 0.01, max: 8 }, // AU
    st_mass: { min: 0.08, max: 8 }, // Solar masses
    st_lum: { min: 0.001, max: 500 }, // Solar luminosity
};

// Function to get a random value in a range, with some non-linearity
function getRandomValue(prop) {
    const range = propertyRanges[prop];
    // Use Math.pow to skew distribution towards smaller values, which is more realistic
    const skew = (prop === 'pl_rade' || prop === 'st_rad' || prop === 'pl_masse' || prop === 'st_mass') ? 2.5 : 2;
    return range.min + (Math.pow(seededRandom(), skew)) * (range.max - range.min);
}

for (let i = 0; i < NUM_NEW_PLANETS; i++) {
    expandedData.push({
        pl_name: `KIC-${Math.floor(seededRandom() * 9000000) + 1000000}.01`,
        pl_rade: getRandomValue('pl_rade'),
        pl_insol: getRandomValue('pl_insol'),
        pl_orbper: getRandomValue('pl_orbper'),
        pl_eqt: Math.floor(getRandomValue('pl_eqt')),
        st_teff: Math.floor(getRandomValue('st_teff')),
        st_rad: getRandomValue('st_rad'),
        disc_facility: "Kepler",
        pl_masse: getRandomValue('pl_masse'),
        pl_dens: getRandomValue('pl_dens'),
        pl_orbsmax: getRandomValue('pl_orbsmax'),
        st_mass: getRandomValue('st_mass'),
        st_lum: getRandomValue('st_lum'),
        disc_year: Math.floor(seededRandom() * (2018 - 2009 + 1)) + 2009,
        discoverymethod: "Transit"
    });
}

// Inject two prime candidates for reproducible results
expandedData.push({
    "pl_name": "KIC-8462852 b", "pl_rade": 1.02, "pl_insol": 1.01, "pl_orbper": 380.5, "pl_eqt": 255, "st_teff": 5700, "st_rad": 0.98, "disc_facility": "Kepler", "pl_masse": 1.05, "pl_dens": 5.5, "pl_orbsmax": 1.05, "st_mass": 0.95, "st_lum": 0.9, "disc_year": 2016, "discoverymethod": "Transit"
});
expandedData.push({
    "pl_name": "KOI-701.03", "pl_rade": 1.1, "pl_insol": 0.72, "pl_orbper": 155.2, "pl_eqt": 240, "st_teff": 4500, "st_rad": 0.7, "disc_facility": "Kepler", "pl_masse": 1.3, "pl_dens": 5.4, "pl_orbsmax": 0.5, "st_mass": 0.75, "st_lum": 0.18, "disc_year": 2014, "discoverymethod": "Transit"
});


export const planetData = expandedData;