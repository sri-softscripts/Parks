// src/lib/data/hotspots-data.ts

export interface TipHotspot {
  id: string;
  title: string;
  thumbnail: string;
  image: string;
  highlight:string;
  content: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export const tipsHotspots: TipHotspot[] = [
  {
    id: "tip-tech",
    title: "USE QUIET TECHNOLOGY",
    thumbnail: "/images/button-technology@2x.jpg",
    image: "/images/christina-silo@2x.png",
    highlight:"We lowered noise emission standards for snowmobiles in Yellowstone, and we created an additional policy incentive to encourage manufacturers to build quieter snowmobiles in the future. I also worked with snowcoach operators to implement the use of low pressure tires instead of tracks, making snowcoaches 4–5 times quieter.",
    content: `

          <p>
            Transportation, including vehicles, aircraft, watercraft, and
            recreational vehicles can contribute large amounts of
            human-caused noise in park settings. Implementing quiet
            technology can help reduce noise emissions from
            transportation. This can include new types of motors, new
            tires/treads, or a variety of other technologies.
          </p>
          <p>
            Christina White from Yellowstone National Park, tells us how
            she is implementing techniques like this to reduce over-snow
            vehicle noise:
          </p>`,
    position: { x: 0, y: 0, z: -400 }
  },
  // {
  //   id: "tip-design",
  //   title: "CONSIDER SITE DESIGN",
  //   thumbnail: "/images/button-design@2x.jpg",
  //   image: "/images/large-design@2x.png",
  //   highlight:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum egestas diam. Nulla fringilla tellus neque, at porttitor dolor gravida nec. Donec fermentum rutrum odio in cursus. In id leo pretium, egestas purus at, sodales enim. Proin ac velit finibus, accumsan odio vel, dignissim augue. Nullam ullamcorper tortor vel tristique.",
  //   content: `
  //         <p>
  //           Sometimes the structure of a site can contribute to poor
  //           soundscape quality. If this is the case, site design can go a
  //           long way in helping to reduce noise emissions in park
  //           settings. This can include noise-reducing pavements, quieter
  //           boardwalks for visitor use, and reducing the speed limit of
  //           vehicles.
  //         </p>
  //         <p>
  //           For example, [personnel from Death Valley NP] describes how
  //           rethinking pavement helped to reduce vehicle noise in the
  //           park:
  //         </p>`,
  //   position: { x: 300, y: 100, z: -300 }
  // },
  {
    id: "tip-maintenance",
    title: "WORK WITH MAINTENANCE CREWS",
    thumbnail: "/src/lib/assets/images/button-maintenance@2x.jpg",
    image: "/images/large-maintenance@2x.jpg",
    highlight:"We implement grounds work using 'Future Leaders' in the youth program on weekends to give the visitors and neighbors a break from the noise. We have found a little planning allows us to get the 'noisy' work completed during the weekdays. We have also replaced mowers, weed-wackers, leaf blowers, and chain saws with battery powered equipment. This has really helped with not only noise polution, but reducing our carbon footprint as well.",
    content: `
      <p>
        Maintenance equipment, such as a leaf blower, lawn mowers, chain
        saws, and other types of equipment can generate noise in park
        settings. Maintenance and facilities crews can consider sheduling
        louder activities during more appropriate times of the day or
        week. Similar to transportation, quiet technology can also be used
        to reduce noise emissions.
      </p>
      <p>
        Douglas Law from Salem Maritime/Saugus Iron Works National
        Historic Sites explains how minor changes to maintenance schedules
        and equipment can improve soundscape conditions:
      </p>`,
    position: { x: -300, y: 50, z: -350 }
  },

];