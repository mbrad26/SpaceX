export const itemOne = {
  "id": 1,
  "active": '',
  "height": {
  },
  "diameter": {
  },
  "flickr_images": ['url1', 'url2'],
  "mass": {
  },
  "rocket_name": 'Rocket One',
  "payload_weights": [
  ],
  "second_stage": {
    },
    "payloads": {
  },
  "engines": {
    "thrust_sea_level": {
    },
    "thrust_vacuum": {
    },
    "thrust_to_weight": 180.1
  },
  "landing_legs": {
  },
  "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9",
  "description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
};

export const itemTwo = {
  "id": 2,
  "flickr_images": [],
  "rocket_name": 'Rocket Two',
  "description": 'This is Rocket Two',
};

export const dragon = {
  "id": "1",
  "name": "Dragon 1",
  "type": "capsule",
  "active": true,
  "crew_capacity": 0,
  "sidewall_angle_deg": 15,
  "orbit_duration_yr": 2,
  "dry_mass_kg": 4200,
  "dry_mass_lb": 9300,
  "first_flight": "2010-12-8",
  "heat_shield": {},
  "flickr_images": [],
  "thrusters": [
    {
      "thrust": {}
    }
  ],
  "launch_payload_mass": {},
  "launch_payload_vol": {},
  "return_payload_mass": {},
  "return_payload_vol": {},
  "pressurized_capsule": {
    "payload_volume": {}
  },
  "trunk": {
    "trunk_volume": {},
    "cargo": {}
  },
  "height_w_trunk": {},
  "diameter": {},
  "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_Dragon",
  "description": "Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS)."
}

export const dataRockets = [itemOne, itemTwo];
