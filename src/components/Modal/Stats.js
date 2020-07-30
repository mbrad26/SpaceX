import React from 'react';

const Stats = ({ activeItem }) => (
  <>
    <h3>Stats</h3>
    <p><span>Active: </span></p>{activeItem.active ? <p>Active</p> : <p>Decommissioned</p>}
    <p><span>Boosters: </span>{activeItem.boosters}</p>
    <p><span>Company: </span>{activeItem.company}</p>
    <p><span>Cost per launch: </span>{activeItem.cost_per_launch}</p>
    <p><span>Country: </span>{activeItem.country}</p>
    <p><span>Diameter in meters: </span>{activeItem.diameter.meters}</p>
    <p><span>Diameter in feet: </span>{activeItem.diameter.feet}</p>
    {activeItem.engines &&
      <>
        <p><span>Engines layout: </span>{activeItem.engines.layout}</p>
        <p><span>Engines number: </span>{activeItem.engines.number}</p>
        <p><span>Engines propellant 1: </span>{activeItem.engines.propellant_1}</p>
        <p><span>Engines propellant 2: </span>{activeItem.engines.propellant_2}</p>
        <p><span>Thrust at sea level in kN: </span>{activeItem.engines.thrust_sea_level.kN}</p>
        <p><span>Thrust at sea level in lbf: </span>{activeItem.engines.thrust_sea_level.lbf}</p>
      </>
    }
    <p><span>First flight: </span>{activeItem.first_flight}</p>
    {activeItem.height &&
      <>
        <p><span>Height in feet: </span>{activeItem.height.feet}</p>
        <p><span>Height in meters: </span>{activeItem.height.meters}</p>
      </>
    }
    {activeItem.landing_legs &&
      <>
        <p><span>Landing legs number: </span>{activeItem.landing_legs.number}</p>
        <p><span>Landing legs material: </span>{activeItem.landing_legs.material}</p>
      </>
    }
    {activeItem.mass &&
      <>
        <p><span>Mass in kg: </span>{activeItem.mass.kg}</p>
        <p><span>Mass lb: </span>{activeItem.mass.lb}</p>
      </>
    }
    {activeItem.rocket_type && <p><span>Rocket type: </span>{activeItem.rocket_type}</p>}
    {activeItem.second_stage &&
      <>
        <p><span>Second stage engines: </span>{activeItem.second_stage.engines}</p>
        <p><span>Second stage fuel amount: </span>{activeItem.second_stage.fuel_amount_tons}</p>
      </>
    }
    <p><span>Success rate: </span>{activeItem.success_rate_pct}%</p>
  </>
);

export default Stats;
