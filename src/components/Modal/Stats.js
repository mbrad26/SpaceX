import React from 'react';

const Stats = ({ activeItem }) => (
  <>
    <h3>Stats</h3>
    <hr/>
    <p><span>Active: </span>{activeItem.active ? <>Yes</>: <>No</>}</p>
    {activeItem.type &&
        <p><span>Type: </span>{activeItem.type}</p>}
    {activeItem.crew_capacity !== "0" &&
      activeItem.crew_capacity
      ? <p><span>Crew: </span>{activeItem.crew_capacity}</p>
      : null}
    <p><span>Boosters: </span>{activeItem.boosters ? activeItem.boosters : 0}</p>
    {activeItem.company
      ? <p><span>Company: </span>{activeItem.company}</p>
      : null
    }
    {activeItem.heat_shield &&
      <p><span>Heat shield: </span>{activeItem.heat_shield.material}</p>}
    {activeItem.dry_mass_kg &&
      <p><span>Dry mass in kg: </span>{activeItem.dry_mass_kg}</p>}
    {activeItem.dry_mass_lb &&
      <p><span>Dry mass in lb: </span>{activeItem.dry_mass_lb}</p>}
    {activeItem.cost_per_launch &&
      <p><span>Cost per launch: </span>${activeItem.cost_per_launch}</p>}
    {activeItem.country &&
      <p><span>Country: </span>{activeItem.country}</p>}
    <p><span>Diameter in meters: </span>{activeItem.diameter.meters}m</p>
    <p><span>Diameter in feet: </span>{activeItem.diameter.feet}ft</p>
    {activeItem.trunk &&
      <>
        <p><span>Cargo solar array: </span>{activeItem.trunk.cargo.solar_array}</p>
        <p><span>Cargo unpressurized: </span>
          {activeItem.trunk.cargo.unpressurized_cargo
            ? <>True</>
            : <>False</>
          }
        </p>
        <p><span>Trunk volume in m3: </span>{activeItem.trunk.trunk_volume.cubic_meters}</p>
        <p><span>Trunk volume in ft3: </span>{activeItem.trunk.trunk_volume.cubic_feet}</p>
      </>
    }
    {activeItem.height_w_trunk &&
      <>
        <p><span>Height with trunk in meters: </span>{activeItem.height_w_trunk.meters}</p>
        <p><span>Height with trunk in feet: </span>{activeItem.height_w_trunk.feet}</p>
      </>
    }
    {activeItem.launch_payload_mass &&
      <>
        <p><span>Launch payload mass in kg: </span>{activeItem.launch_payload_mass.kg}</p>
        <p><span>Launch payload mass in lb: </span>{activeItem.launch_payload_mass.lb}</p>
      </>
    }
    {activeItem.launch_payload_vol &&
      <>
        <p><span>Launch payload volume in m3: </span>{activeItem.launch_payload_vol.cubic_meters}</p>
        <p><span>Launch payload volume in ft3: </span>{activeItem.launch_payload_vol.cubic_feet}</p>
      </>
    }
    {activeItem.return_payload_mass &&
      <>
        <p><span>Return payload mass in kg: </span>{activeItem.return_payload_mass.kg}</p>
        <p><span>Return payload mass in lb: </span>{activeItem.return_payload_mass.lb}</p>
      </>
    }
    {activeItem.return_payload_vol &&
      <>
        <p><span>Return payload volume in m3: </span>{activeItem.return_payload_vol.cubic_meters}</p>
        <p><span>Return payload volume in ft3: </span>{activeItem.return_payload_vol.cubic_feet}</p>
      </>
    }
    {activeItem.thrusters &&
      activeItem.thrusters.map(
        (item, i) =>
        <div key={i}>
          <p><span>Thrusters type: </span>{item.type}</p>
          <ul>
            <li><p><span>Thrusters amount: </span>{item.amount}</p></li>
            <li><p><span>Thrusters fuel 1: </span>{item.fuel_1}</p></li>
            <li><p><span>Thrusters fuel 2: </span>{item.fuel_2}</p></li>
            <li><p><span>Thrusters ISP: </span>{item.isp}</p></li>
            <li><p><span>Thrusters pods: </span>{item.pods}</p></li>
            <li><p><span>Thrust in kn: </span>{item.thrust.kN}</p></li>
            <li><p><span>Thrust in lbf: </span>{item.thrust.lbf}</p></li>
          </ul>
        </div>
      )
    }
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
        <p><span>Height in feet: </span>{activeItem.height.feet}ft</p>
        <p><span>Height in meters: </span>{activeItem.height.meters}m</p>
      </>
    }
    {activeItem.landing_legs &&
      <>
        <p><span>Landing legs number: </span>{activeItem.landing_legs.number}</p>
        <p><span>Landing legs material: </span>
          {activeItem.landing_legs.material ? activeItem.landing_legs.material : <>n/a</>}
        </p>
      </>
    }
    {activeItem.mass &&
      <>
        <p><span>Mass in kg: </span>{activeItem.mass.kg}</p>
        <p><span>Mass lb: </span>{activeItem.mass.lb}</p>
      </>
    }
    {activeItem.rocket_type &&
      <p><span>Rocket type: </span>{activeItem.rocket_type}</p>}
    {activeItem.second_stage &&
      <>
        <p><span>Second stage engines: </span>{activeItem.second_stage.engines}</p>
        <p><span>Second stage fuel amount in tons: </span>{activeItem.second_stage.fuel_amount_tons}</p>
      </>
    }
    {activeItem.success_rate_pct !== "0" &&
      activeItem.success_rate_pct ? <p><span>Success rate: </span>{activeItem.success_rate_pct}%</p> : null}
  </>
);

export default Stats;
